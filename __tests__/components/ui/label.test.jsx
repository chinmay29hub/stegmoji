import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'

// Mock the cn function from lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' ')
}))

describe('Label Component', () => {
  test('renders label with text', () => {
    render(<Label>Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  test('renders label with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  test('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('custom-class')
  })

  test('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Label ref={ref}>Test Label</Label>)
    
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
  })
})
