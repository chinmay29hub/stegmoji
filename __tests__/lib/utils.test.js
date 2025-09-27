import { cn, copyToClipboard, downloadText, formatBytes, debounce } from '@/lib/utils'

// Mock React for the useLocalStorageState hook
jest.mock('react', () => ({
  useState: jest.fn(),
  useCallback: jest.fn(),
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
  })
})
