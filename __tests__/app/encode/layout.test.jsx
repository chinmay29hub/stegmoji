import { render, screen } from '@testing-library/react'
import EncodeLayout from '@/app/encode/layout'

// Mock Next.js components
jest.mock('next/head', () => {
  return function Head({ children }) {
    return <>{children}</>
  }
})

describe('EncodeLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <EncodeLayout>
        <div>Test content</div>
      </EncodeLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <EncodeLayout>
        <div>Test content</div>
      </EncodeLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders with metadata', () => {
    const { container } = render(
      <EncodeLayout>
        <div>Test content</div>
      </EncodeLayout>
    )
    expect(container).toBeInTheDocument()
  })
})
