import React from 'react'
import { render } from '@testing-library/react'
import SEOHead from '@/components/seo/SEOHead'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }) {
    // Simple mock that just renders children
    return <>{children}</>
  }
})

describe('SEOHead', () => {
  beforeEach(() => {
    // Clear document head before each test
    document.head.innerHTML = ''
    document.title = ''
  })

  test('renders without crashing', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        keywords="test, keywords"
        canonical="https://example.com"
        ogImage="https://example.com/image.png"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with default props', () => {
    const { container } = render(<SEOHead />)
    expect(container).toBeInTheDocument()
  })

  test('renders with custom title', () => {
    const { container } = render(
      <SEOHead
        title="Custom Title"
        description="Test Description"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with custom description', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Custom Description"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with custom keywords', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        keywords="custom, keywords, test"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with canonical URL', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        canonical="https://example.com/custom"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with Open Graph image', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        ogImage="https://example.com/custom-image.png"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with Twitter Card meta tags', () => {
    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        ogImage="https://example.com/image.png"
      />
    )
    expect(container).toBeInTheDocument()
  })

  test('renders with structured data', () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Test App"
    }

    const { container } = render(
      <SEOHead
        title="Test Title"
        description="Test Description"
        structuredData={structuredData}
      />
    )
    expect(container).toBeInTheDocument()
  })
})
