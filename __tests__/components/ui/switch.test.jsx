import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '@/components/ui/switch'

// Mock the cn function from lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' ')
}))

describe('Switch Component', () => {
  test('renders switch with default props', () => {
    render(<Switch />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  test('handles checked state', () => {
    const handleChange = jest.fn()
    render(<Switch checked={true} onCheckedChange={handleChange} />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeChecked()
  })

  test('handles unchecked state', () => {
    const handleChange = jest.fn()
    render(<Switch checked={false} onCheckedChange={handleChange} />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).not.toBeChecked()
  })

  test('handles click events', () => {
    const handleChange = jest.fn()
    render(<Switch onCheckedChange={handleChange} />)
    
    const switchElement = screen.getByRole('switch')
    fireEvent.click(switchElement)
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('handles disabled state', () => {
    render(<Switch disabled />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
  })

  test('applies custom className', () => {
    render(<Switch className="custom-class" />)
    
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveClass('custom-class')
  })

  test('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Switch ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
