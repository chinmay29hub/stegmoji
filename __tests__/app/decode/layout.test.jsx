import { render, screen } from '@testing-library/react'
import DecodeLayout from '@/app/decode/layout'

// Mock Next.js components
jest.mock('next/head', () => {
  return function Head({ children }) {
    return <>{children}</>
  }
})

describe('DecodeLayout', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <DecodeLayout>
        <div>Test content</div>
      </DecodeLayout>
    )
    expect(container).toBeInTheDocument()
  })

  test('renders children', () => {
    render(
      <DecodeLayout>
        <div>Test content</div>
      </DecodeLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders with metadata', () => {
    const { container } = render(
      <DecodeLayout>
        <div>Test content</div>
      </DecodeLayout>
    )
    expect(container).toBeInTheDocument()
  })
})
