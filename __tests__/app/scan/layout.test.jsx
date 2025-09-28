import { render, screen } from '@testing-library/react'
import ScanLayout from '@/app/scan/layout'

// Mock Next.js components
jest.mock('next/head', () => {
  return function Head({ children }) {
    return <>{children}</>
  }
})

describe('ScanLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <ScanLayout>
        <div>Test content</div>
      </ScanLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <ScanLayout>
        <div>Test content</div>
      </ScanLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders with metadata', () => {
    const { container } = render(
      <ScanLayout>
        <div>Test content</div>
      </ScanLayout>
    )
    expect(container).toBeInTheDocument()
  })
})
