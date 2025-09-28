import { render, screen } from '@testing-library/react'
import AboutLayout from '@/app/about/layout'

// Mock Next.js components
jest.mock('next/head', () => {
  return function Head({ children }) {
    return <>{children}</>
  }
})

describe('AboutLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <AboutLayout>
        <div>Test content</div>
      </AboutLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <AboutLayout>
        <div>Test content</div>
      </AboutLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders with metadata', () => {
    const { container } = render(
      <AboutLayout>
        <div>Test content</div>
      </AboutLayout>
    )
    expect(container).toBeInTheDocument()
  })
})
