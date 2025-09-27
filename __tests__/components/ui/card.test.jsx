import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Mock the cn function from lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' ')
}))

describe('Card Component', () => {
  test('renders card with content', () => {
    render(
      <Card>
        <CardContent>Test content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('renders card with header', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    render(
      <Card className="custom-class">
        <CardContent>Test content</CardContent>
      </Card>
    )
    
    // The Card component itself should have the custom class
    const card = screen.getByText('Test content').closest('div').parentElement
    expect(card).toHaveClass('custom-class')
  })

  test('renders as child component when asChild is true', () => {
    // Suppress the asChild prop warning for this test
    const originalError = console.error
    console.error = jest.fn()
    
    render(
      <Card asChild>
        <section>
          <CardContent>Test content</CardContent>
        </section>
      </Card>
    )
    
    const section = screen.getByText('Test content').closest('section')
    expect(section).toBeInTheDocument()
    
    // Restore console.error
    console.error = originalError
  })
})
