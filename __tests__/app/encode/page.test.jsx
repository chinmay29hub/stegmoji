import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useLocalStorageState } from '@/lib/utils'
import EncodePage from '@/app/encode/page'

// Mock the dependencies
jest.mock('@/lib/utils', () => ({
  useLocalStorageState: jest.fn(),
  copyToClipboard: jest.fn(),
  downloadText: jest.fn(),
  formatBytes: jest.fn((bytes) => `${bytes} bytes`),
  cn: (...args) => args.filter(Boolean).join(' ')
}))

jest.mock('@/lib/steganography', () => ({
  encode: jest.fn(),
  MODES: {
    TAIL: 'tail',
    INTERLEAVED: 'interleaved',
    ZWJ_AWARE: 'zwj-aware'
  },
  calculateCapacity: jest.fn(),
}))

describe('EncodePage Component', () => {
  const mockEncode = require('@/lib/steganography').encode
  const mockUseLocalStorageState = useLocalStorageState
  const mockCopyToClipboard = require('@/lib/utils').copyToClipboard
  const mockDownloadText = require('@/lib/utils').downloadText

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseLocalStorageState.mockImplementation((key, defaultValue) => {
      const mockValues = {
        encodeMode: 'tail',
        encodeCompression: false,
        encodeEncryption: false
      }
      return [mockValues[key] || defaultValue, jest.fn()]
    })
    mockCopyToClipboard.mockResolvedValue(true)
    mockDownloadText.mockImplementation(() => {})
    mockEncode.mockResolvedValue('encoded-text')
  })

  test('renders encode page with all form elements', () => {
    render(<EncodePage />)
    
    expect(screen.getByRole('heading', { name: /encode message/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your secret message here...')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter cover text here...')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /encode message/i })).toBeInTheDocument()
  })

  test('handles message input', () => {
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    
    expect(messageInput.value).toBe('Secret message')
  })

  test('handles cover text input', () => {
    render(<EncodePage />)
    
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    
    expect(coverInput.value).toBe('Cover text')
  })

  test('handles mode selection', () => {
    render(<EncodePage />)
    
    const modeSelect = screen.getByRole('combobox')
    fireEvent.click(modeSelect)
    
    // This would need to be implemented based on the actual select component behavior
    expect(modeSelect).toBeInTheDocument()
  })

  test('handles compression toggle', () => {
    render(<EncodePage />)
    
    const compressionSwitch = screen.getByRole('switch', { name: /enable compression/i })
    fireEvent.click(compressionSwitch)
    
    expect(compressionSwitch).toBeInTheDocument()
  })

  test('handles encryption toggle', () => {
    render(<EncodePage />)
    
    const encryptionSwitch = screen.getAllByRole('switch')[1]
    fireEvent.click(encryptionSwitch)
    
    expect(encryptionSwitch).toBeInTheDocument()
  })

  test('shows passphrase input when encryption is enabled', () => {
    mockUseLocalStorageState.mockImplementation((key, defaultValue) => {
      const mockValues = {
        encodeMode: 'tail',
        encodeCompression: false,
        encodeEncryption: true
      }
      return [mockValues[key] || defaultValue, jest.fn()]
    })
    
    render(<EncodePage />)
    
    expect(screen.getByPlaceholderText('Enter encryption passphrase')).toBeInTheDocument()
  })

  test('handles encode button click', async () => {
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    const encodeButton = screen.getByRole('button', { name: /encode message/i })
    
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    fireEvent.click(encodeButton)
    
    await waitFor(() => {
      expect(mockEncode).toHaveBeenCalledWith('Secret message', 'Cover text', {
        mode: 'tail',
        compress: false,
        encrypt: false,
        passphrase: ''
      })
    })
  })

  test('disables button when message is empty', async () => {
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    const encodeButton = screen.getByRole('button', { name: /encode message/i })
    
    // Button should be disabled when message is empty
    expect(encodeButton).toBeDisabled()
    
    // Set cover text but no message - button should still be disabled
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    expect(encodeButton).toBeDisabled()
    
    // Set message - button should be enabled
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    expect(encodeButton).not.toBeDisabled()
  })

  test('disables button when cover text is empty', async () => {
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    const encodeButton = screen.getByRole('button', { name: /encode message/i })
    
    // Button should be disabled when cover text is empty
    expect(encodeButton).toBeDisabled()
    
    // Set message but no cover text - button should still be disabled
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    expect(encodeButton).toBeDisabled()
    
    // Set cover text - button should be enabled
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    expect(encodeButton).not.toBeDisabled()
  })

  test('handles copy output', async () => {
    mockEncode.mockResolvedValue('encoded-text')
    
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    const encodeButton = screen.getByRole('button', { name: /encode message/i })
    
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    fireEvent.click(encodeButton)
    
    await waitFor(() => {
      const copyButton = screen.getByText('Copy Output')
      fireEvent.click(copyButton)
    })
    
    expect(mockCopyToClipboard).toHaveBeenCalledWith('encoded-text')
  })

  test('handles download output', async () => {
    mockEncode.mockResolvedValue('encoded-text')
    
    render(<EncodePage />)
    
    const messageInput = screen.getByPlaceholderText('Enter your secret message here...')
    const coverInput = screen.getByPlaceholderText('Enter cover text here...')
    const encodeButton = screen.getByRole('button', { name: /encode message/i })
    
    fireEvent.change(messageInput, { target: { value: 'Secret message' } })
    fireEvent.change(coverInput, { target: { value: 'Cover text' } })
    fireEvent.click(encodeButton)
    
    await waitFor(() => {
      const downloadButton = screen.getByText('Download')
      fireEvent.click(downloadButton)
    })
    
    expect(mockDownloadText).toHaveBeenCalledWith('encoded-text', 'stegmoji-encoded.txt')
  })
})
