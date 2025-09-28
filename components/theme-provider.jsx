'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get initial theme from localStorage
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setTheme('dark')
    } else if (saved === 'false') {
      setTheme('light')
    } else {
      // No preference, default to dark mode for new users
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      // Only apply theme changes after initial load
      // The script already applied the initial theme
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      // Save to localStorage
      localStorage.setItem('darkMode', theme === 'dark')
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
