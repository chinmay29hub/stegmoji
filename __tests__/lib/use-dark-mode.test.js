import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from '@/lib/use-dark-mode'

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

// Mock matchMedia
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  value: mockMatchMedia,
})

describe('useDarkMode Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
    mockMatchMedia.mockReturnValue({ matches: false })
  })

  test('initializes with false when no localStorage value', () => {
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(false)
    expect(result.current.mounted).toBe(true)
  })

  test('initializes with true when localStorage has true', () => {
    mockLocalStorage.getItem.mockReturnValue('true')
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(true) // Should be true from localStorage
    expect(result.current.mounted).toBe(true)
  })

  test('initializes with false when localStorage has false', () => {
    mockLocalStorage.getItem.mockReturnValue('false')
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(false)
    expect(result.current.mounted).toBe(true)
  })

  test('uses system preference when no localStorage value', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    mockMatchMedia.mockReturnValue({ matches: true })
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(true) // Should be true from system preference
    expect(result.current.mounted).toBe(true)
  })

  test('toggles dark mode', () => {
    const { result } = renderHook(() => useDarkMode())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.darkMode).toBe(true)
  })

  test('toggles back to light mode', () => {
    const { result } = renderHook(() => useDarkMode())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.darkMode).toBe(false)
  })

  test('handles localStorage errors gracefully', () => {
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })
    
    const { result } = renderHook(() => useDarkMode())
    
    // The hook should still initialize with false values
    expect(result.current.darkMode).toBe(false)
    expect(result.current.mounted).toBe(true)
    
    // Clean up
    consoleSpy.mockRestore()
  })

  test('handles matchMedia errors gracefully', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    mockMatchMedia.mockImplementation(() => {
      throw new Error('matchMedia error')
    })
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(false)
    expect(result.current.mounted).toBe(true)
  })

  test('sets mounted to true after initialization', () => {
    const { result } = renderHook(() => useDarkMode())
    
    // mounted should be true after initialization
    expect(result.current.mounted).toBe(true)
  })
})
