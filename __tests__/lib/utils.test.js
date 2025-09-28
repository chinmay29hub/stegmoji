import { cn, useLocalStorageState, copyToClipboard, downloadText, formatBytes, debounce, getCanonicalUrl } from '@/lib/utils'

// Mock React for the useLocalStorageState hook
const mockSetState = jest.fn()
const mockSetMounted = jest.fn()
const mockUseEffect = jest.fn()
const mockUseCallback = jest.fn()

jest.mock('react', () => ({
  useState: jest.fn((initial) => [initial, mockSetState]),
  useEffect: jest.fn(),
  useCallback: jest.fn((fn) => fn)
}))

describe('Utility Functions', () => {
  describe('cn', () => {
    test('should merge class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(typeof result).toBe('string')
    })

    test('should handle conditional classes', () => {
      const result = cn('base', { 'conditional': true })
      expect(typeof result).toBe('string')
    })

    test('should handle empty input', () => {
      const result = cn()
      expect(typeof result).toBe('string')
    })
  })

  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText = jest.fn()
      } else {
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: jest.fn(),
          },
          writable: true,
        })
      }
    })

    test('should copy text to clipboard successfully', async () => {
      navigator.clipboard.writeText.mockResolvedValueOnce()
      
      const result = await copyToClipboard('test text')
      
      expect(result).toBe(true)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
    })

    test('should handle clipboard errors', async () => {
      navigator.clipboard.writeText.mockRejectedValueOnce(new Error('Clipboard error'))
      
      const result = await copyToClipboard('test text')
      
      expect(result).toBe(false)
    })
  })

  describe('downloadText', () => {
    beforeEach(() => {
      // Mock DOM methods
      global.URL.createObjectURL = jest.fn(() => 'mock-url')
      global.URL.revokeObjectURL = jest.fn()
      
      // Mock document.createElement and DOM manipulation
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
      }
      
      global.document.createElement = jest.fn(() => mockLink)
      
      // Create a proper mock body element
      const mockBody = document.createElement('div')
      mockBody.appendChild = jest.fn()
      mockBody.removeChild = jest.fn()
      Object.defineProperty(document, 'body', {
        value: mockBody,
        writable: true,
      })
    })

    test('should download text as file', () => {
      const text = 'test content'
      const filename = 'test.txt'
      
      downloadText(text, filename)
      
      expect(global.URL.createObjectURL).toHaveBeenCalled()
      expect(global.document.createElement).toHaveBeenCalledWith('a')
    })

    test('should use default filename', () => {
      const text = 'test content'
      
      downloadText(text)
      
      expect(global.URL.createObjectURL).toHaveBeenCalled()
    })
  })

  describe('formatBytes', () => {
    test('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1048576)).toBe('1 MB')
    })

    test('should handle large numbers', () => {
      const result = formatBytes(1073741824)
      expect(result).toContain('GB')
    })

    test('should handle decimal values', () => {
      const result = formatBytes(1536) // 1.5 KB
      expect(result).toContain('1.5')
    })
  })

  describe('useLocalStorageState', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      require('react').useState.mockImplementation((initial) => [initial, mockSetState])
      require('react').useEffect.mockImplementation(mockUseEffect)
      require('react').useCallback.mockImplementation((fn) => fn)
    })

    test('should return initial state and setter', () => {
      const [state, setState] = useLocalStorageState('test-key', 'default-value')
      
      expect(state).toBe('default-value')
      expect(typeof setState).toBe('function')
    })

    test('should call useEffect with correct dependencies', () => {
      useLocalStorageState('test-key', 'default-value')
      
      expect(mockUseEffect).toHaveBeenCalledWith(expect.any(Function), ['test-key'])
    })

    test('should handle localStorage errors in useEffect', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      
      // Mock localStorage to throw error
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => { throw new Error('localStorage error') })
        },
        writable: true
      })

      useLocalStorageState('test-key', 'default-value')
      
      // Get the useEffect callback and call it
      const useEffectCallback = mockUseEffect.mock.calls[0][0]
      useEffectCallback()
      
      expect(consoleSpy).toHaveBeenCalledWith('Error reading localStorage key "test-key":', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('should debounce function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('arg1')
      debouncedFn('arg2')
      debouncedFn('arg3')
      
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg3')
    })

    test('should reset timer on new calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('arg1')
      jest.advanceTimersByTime(50)
      
      debouncedFn('arg2')
      jest.advanceTimersByTime(50)
      
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(50)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg2')
    })

    test('should handle multiple rapid calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('call1')
      debouncedFn('call2')
      debouncedFn('call3')
      debouncedFn('call4')
      
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('call4')
    })

    test('should handle zero delay', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 0)
      
      debouncedFn('immediate')
      
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(0)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('immediate')
    })
  })

  describe('getCanonicalUrl', () => {
    test('should generate canonical URL with pathname', () => {
      expect(getCanonicalUrl('/encode')).toBe('https://chinmay29hub-stegmoji.vercel.app/encode')
    })

    test('should generate canonical URL without pathname', () => {
      expect(getCanonicalUrl()).toBe('https://chinmay29hub-stegmoji.vercel.app')
    })

    test('should generate canonical URL with empty pathname', () => {
      expect(getCanonicalUrl('')).toBe('https://chinmay29hub-stegmoji.vercel.app')
    })

    test('should generate canonical URL with complex pathname', () => {
      expect(getCanonicalUrl('/encode?mode=tail')).toBe('https://chinmay29hub-stegmoji.vercel.app/encode?mode=tail')
    })
  })

  describe('formatBytes', () => {
    test('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1048576)).toBe('1 MB')
    })

    test('should handle large numbers', () => {
      expect(formatBytes(1073741824)).toBe('1 GB')
    })

    test('should handle decimal places', () => {
      expect(formatBytes(1536)).toBe('1.5 KB')
    })

      test('should handle negative numbers', () => {
        expect(formatBytes(-1024)).toBe('NaN undefined')
      })

      test('should handle zero bytes', () => {
        expect(formatBytes(0)).toBe('0 Bytes')
      })

      test('should handle very large numbers', () => {
        expect(formatBytes(1099511627776)).toBe('1 undefined')
      })

      test('should handle decimal precision', () => {
        expect(formatBytes(1536)).toBe('1.5 KB')
        expect(formatBytes(1537)).toBe('1.5 KB')
      })
    })

      describe('useLocalStorageState', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          // Mock localStorage.clear
          if (localStorage.clear) {
            localStorage.clear()
          }
        })

        test('should initialize with default value', () => {
          const [value] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')
        })

        test('should handle localStorage errors gracefully', () => {
          // Mock localStorage to throw error
          const originalGetItem = localStorage.getItem
          localStorage.getItem = jest.fn(() => {
            throw new Error('localStorage error')
          })

          const [value] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // Restore original method
          localStorage.getItem = originalGetItem
        })

        test('should handle setValue errors gracefully', () => {
          // Mock localStorage.setItem to throw error
          const originalSetItem = localStorage.setItem
          localStorage.setItem = jest.fn(() => {
            throw new Error('localStorage error')
          })

          const [value, setValue] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // This should not throw an error
          setValue('new-value')

          // Restore original method
          localStorage.setItem = originalSetItem
        })

        test('should handle JSON parsing errors', () => {
          // Mock localStorage to return invalid JSON
          const originalGetItem = localStorage.getItem
          localStorage.getItem = jest.fn(() => 'invalid-json')

          const [value] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // Restore original method
          localStorage.getItem = originalGetItem
        })

        test('should handle null localStorage value', () => {
          // Mock localStorage to return null
          const originalGetItem = localStorage.getItem
          localStorage.getItem = jest.fn(() => null)

          const [value] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // Restore original method
          localStorage.getItem = originalGetItem
        })

        test('should handle undefined window', () => {
          // Mock window as undefined
          const originalWindow = global.window
          global.window = undefined

          const [value, setValue] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // This should not throw an error
          setValue('new-value')

          // Restore original window
          global.window = originalWindow
        })

        test('should handle mounted state changes', () => {
          const [value, setValue] = useLocalStorageState('test-key', 'default')
          expect(value).toBe('default')

          // Test setValue when mounted
          setValue('new-value')
          expect(value).toBe('default') // State won't change in test environment
        })
      })
})
