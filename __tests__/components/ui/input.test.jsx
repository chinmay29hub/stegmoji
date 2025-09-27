import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/input'

// Mock the cn function from lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' ')
}))

describe('Input Component', () => {
  test('renders input with default props', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('renders input with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  test('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('renders different input types', () => {
    const { rerender } = render(<Input type="password" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')

    rerender(<Input type="email" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'email')
  })

  test('handles disabled state', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  test('applies custom className', () => {
    render(<Input className="custom-class" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  test('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
