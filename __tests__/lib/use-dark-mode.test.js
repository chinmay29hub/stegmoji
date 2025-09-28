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

  test('initializes with true when no localStorage value (defaults to dark mode)', () => {
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(true)
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

  test('defaults to dark mode when no localStorage value (ignores system preference)', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    mockMatchMedia.mockReturnValue({ matches: false }) // System prefers light mode
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.darkMode).toBe(true) // Should be true (dark mode default)
    expect(result.current.mounted).toBe(true)
  })

  test('toggles from dark mode to light mode', () => {
    const { result } = renderHook(() => useDarkMode())
    
    // Should start with dark mode (true)
    expect(result.current.darkMode).toBe(true)
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.darkMode).toBe(false)
  })

  test('toggles back to dark mode', () => {
    const { result } = renderHook(() => useDarkMode())
    
    // Start with dark mode (true)
    expect(result.current.darkMode).toBe(true)
    
    // Toggle to light mode (false)
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.darkMode).toBe(false)
    
    // Toggle back to dark mode (true)
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.darkMode).toBe(true)
  })

  test('handles localStorage errors gracefully', () => {
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })
    
    const { result } = renderHook(() => useDarkMode())
    
    // The hook should still initialize with dark mode default (true)
    expect(result.current.darkMode).toBe(true)
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
    
    expect(result.current.darkMode).toBe(true) // Should default to dark mode
    expect(result.current.mounted).toBe(true)
  })

  test('sets mounted to true after initialization', () => {
    const { result } = renderHook(() => useDarkMode())
    
    // mounted should be true after initialization
    expect(result.current.mounted).toBe(true)
  })
})
