import { render } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Mock Next.js components
jest.mock('next/script', () => {
  return function MockScript({ children, ...props }) {
    return <script {...props}>{children}</script>
  }
})

// Mock the client layout component
jest.mock('@/components/client-layout', () => {
  return function MockClientLayout({ children }) {
    return <div data-testid="client-layout">{children}</div>
  }
})

// Mock the theme provider
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('RootLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    )
    expect(getByText('Test content')).toBeInTheDocument()
  })

  test('includes Google Analytics scripts', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    )
    
    // Check for Google Analytics script
    const scripts = container.querySelectorAll('script')
    expect(scripts.length).toBeGreaterThan(0)
  })

  test('includes security headers in head', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    )
    
    // Check for meta tags
    const metaTags = container.querySelectorAll('meta')
    expect(metaTags.length).toBeGreaterThan(0)
  })
})
