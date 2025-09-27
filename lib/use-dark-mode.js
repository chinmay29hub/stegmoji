import { useState, useEffect } from 'react'

/**
 * SSR-safe dark mode hook
 * Prevents hydration mismatches and flash of light mode
 */
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get initial preference
    try {
      const saved = localStorage.getItem('darkMode')
      let isDark = false
      
      if (saved !== null) {
        isDark = JSON.parse(saved)
      } else {
        // No preference saved, use system preference
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      setDarkMode(isDark)
      
      // Don't apply classes here - the script already did it
      // Just sync the state
    } catch (error) {
      console.warn('Error initializing dark mode:', error)
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        
        // Apply DOM classes when state changes
        if (darkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (error) {
        console.warn('Error saving dark mode preference:', error)
      }
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return {
    darkMode,
    toggleDarkMode,
    mounted
  }
}
