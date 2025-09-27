import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useLocalStorageState } from '@/lib/utils'
import DecodePage from '@/app/decode/page'

// Mock the dependencies
jest.mock('@/lib/utils', () => ({
  useLocalStorageState: jest.fn(),
  copyToClipboard: jest.fn(),
  cn: (...args) => args.filter(Boolean).join(' ')
}))

jest.mock('@/lib/steganography', () => ({
  decode: jest.fn(),
  scanText: jest.fn(),
  MODES: {
    TAIL: 'tail',
    INTERLEAVED: 'interleaved',
    ZWJ_AWARE: 'zwj-aware'
  },
}))

describe('DecodePage Component', () => {
  const mockDecode = require('@/lib/steganography').decode
  const mockScanText = require('@/lib/steganography').scanText
  const mockUseLocalStorageState = useLocalStorageState
  const mockCopyToClipboard = require('@/lib/utils').copyToClipboard

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseLocalStorageState.mockImplementation((key, defaultValue) => {
      const mockValues = {
        decodeMode: 'auto'
      }
      return [mockValues[key] || defaultValue, jest.fn()]
    })
    mockCopyToClipboard.mockResolvedValue(true)
    mockScanText.mockReturnValue({ hasHiddenData: false, vsCount: 0 })
  })

  test('renders decode page with all form elements', () => {
    render(<DecodePage />)
    
    expect(screen.getByRole('heading', { name: /decode message/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Paste encoded text here...')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /decode message/i })).toBeInTheDocument()
  })

  test('handles encoded text input', () => {
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    
    expect(encodedInput.value).toBe('Encoded text')
  })

  test('handles passphrase input', () => {
    render(<DecodePage />)
    
    const passphraseInput = screen.getByPlaceholderText('Enter decryption passphrase if needed')
    fireEvent.change(passphraseInput, { target: { value: 'password' } })
    
    expect(passphraseInput.value).toBe('password')
  })

  test('handles mode selection', () => {
    render(<DecodePage />)
    
    const modeSelect = screen.getByRole('combobox')
    fireEvent.click(modeSelect)
    
    expect(modeSelect).toBeInTheDocument()
  })

  test('handles decode button click', async () => {
    mockDecode.mockResolvedValue('Decoded message')
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const decodeButton = screen.getByRole('button', { name: /decode message/i })
    
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    fireEvent.click(decodeButton)
    
    await waitFor(() => {
      expect(mockDecode).toHaveBeenCalledWith('Encoded text', {
        mode: 'auto',
        passphrase: ''
      })
    })
  })

  test('disables button when encoded text is empty', async () => {
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const decodeButton = screen.getByRole('button', { name: /decode message/i })
    
    // Button should be disabled when there's no text
    expect(decodeButton).toBeDisabled()
    
    // Set some text to enable the button
    fireEvent.change(encodedInput, { target: { value: 'test' } })
    expect(decodeButton).not.toBeDisabled()
    
    // Clear the text - button should be disabled again
    fireEvent.change(encodedInput, { target: { value: '' } })
    expect(decodeButton).toBeDisabled()
  })

  test('shows decoded message after successful decode', async () => {
    mockDecode.mockResolvedValue('Decoded message')
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const decodeButton = screen.getByRole('button', { name: /decode message/i })
    
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    fireEvent.click(decodeButton)
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('Decoded message')).toBeInTheDocument()
    })
  })

  test('shows error when decode fails', async () => {
    mockDecode.mockRejectedValue(new Error('Decode failed'))
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const decodeButton = screen.getByRole('button', { name: /decode message/i })
    
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    fireEvent.click(decodeButton)
    
    await waitFor(() => {
      expect(screen.getByText('Decode failed')).toBeInTheDocument()
    })
  })

  test('handles copy decoded message', async () => {
    mockDecode.mockResolvedValue('Decoded message')
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const decodeButton = screen.getByRole('button', { name: /decode message/i })
    
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    fireEvent.click(decodeButton)
    
    await waitFor(() => {
      const copyButton = screen.getByText('Copy Decoded Message')
      fireEvent.click(copyButton)
    })
    
    expect(mockCopyToClipboard).toHaveBeenCalledWith('Decoded message')
  })

  test('shows hidden data detection', () => {
    mockScanText.mockReturnValue({ hasHiddenData: true, vsCount: 5 })
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    
    expect(screen.getByText('✅ Hidden data detected: 5 variation selectors found')).toBeInTheDocument()
  })

  test('shows no hidden data message', () => {
    mockScanText.mockReturnValue({ hasHiddenData: false, vsCount: 0 })
    
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    fireEvent.change(encodedInput, { target: { value: 'Plain text' } })
    
    expect(screen.getByText('ℹ️ No hidden data detected in this text')).toBeInTheDocument()
  })

  test('handles clear button', () => {
    render(<DecodePage />)
    
    const encodedInput = screen.getByPlaceholderText('Paste encoded text here...')
    const clearButton = screen.getByText('Clear')
    
    fireEvent.change(encodedInput, { target: { value: 'Encoded text' } })
    fireEvent.click(clearButton)
    
    expect(encodedInput.value).toBe('')
  })
})
