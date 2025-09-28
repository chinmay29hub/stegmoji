import { render, screen, fireEvent } from '@testing-library/react'
import ClientLayout from '@/components/client-layout'

// Mock the theme provider
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
    mounted: true
  })
}))

// Mock the useDarkMode hook
jest.mock('@/lib/use-dark-mode', () => ({
  useDarkMode: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
    isDark: false
  })
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

describe('ClientLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders navigation', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    expect(screen.getAllByText(/Stegmoji/i)).toHaveLength(2) // Logo and footer
    expect(screen.getAllByText(/Encode/i)).toHaveLength(2) // Desktop and mobile nav
    expect(screen.getAllByText(/Decode/i)).toHaveLength(2) // Desktop and mobile nav
    expect(screen.getAllByText(/Scan/i)).toHaveLength(2) // Desktop and mobile nav
    expect(screen.getAllByText(/About/i)).toHaveLength(2) // Desktop and mobile nav
  })

  test('renders theme toggle button', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    const themeButton = screen.getByRole('button', { name: /switch to/i })
    expect(themeButton).toBeInTheDocument()
  })

  test('renders GitHub button', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    const githubButton = screen.getByRole('button', { name: /github/i })
    expect(githubButton).toBeInTheDocument()
  })

  test('renders footer', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    expect(screen.getByText(/Made with/i)).toBeInTheDocument()
  })

  test('handles theme toggle click', () => {
    render(
      <ClientLayout>
        <div>Test content</div>
      </ClientLayout>
    )
    
    const themeButton = screen.getByRole('button', { name: /switch to/i })
    expect(themeButton).toBeInTheDocument()
    
    // Test that clicking doesn't cause errors
    fireEvent.click(themeButton)
    expect(themeButton).toBeInTheDocument()
  })
})
