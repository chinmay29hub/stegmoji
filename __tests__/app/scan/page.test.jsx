import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ScanPage from '@/app/scan/page'

// Mock the cn function from lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' ')
}))

// Mock the dependencies
jest.mock('@/lib/unicode', () => ({
  analyzeInvisibleChars: jest.fn(),
  getCodepointBreakdown: jest.fn(),
  getGraphemeClusters: jest.fn(),
  checkNormalization: jest.fn(),
}))

describe('ScanPage Component', () => {
  const mockAnalyzeInvisibleChars = require('@/lib/unicode').analyzeInvisibleChars
  const mockGetCodepointBreakdown = require('@/lib/unicode').getCodepointBreakdown
  const mockGetGraphemeClusters = require('@/lib/unicode').getGraphemeClusters
  const mockCheckNormalization = require('@/lib/unicode').checkNormalization

  beforeEach(() => {
    jest.clearAllMocks()
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 0,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([])
    mockGetGraphemeClusters.mockReturnValue([])
    mockCheckNormalization.mockReturnValue({
      original: '',
      nfc: '',
      nfkc: '',
      nfcChanged: false,
      nfkcChanged: false
    })
  })

  test('renders scan page with all form elements', () => {
    render(<ScanPage />)
    
    expect(screen.getByText('Unicode Scanner')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text to analyze...')).toBeInTheDocument()
    expect(screen.getByText('Normal Text')).toBeInTheDocument()
    expect(screen.getByText('Tail Mode')).toBeInTheDocument()
    expect(screen.getByText('Interleaved')).toBeInTheDocument()
    expect(screen.getByText('ZWJ-Aware')).toBeInTheDocument()
  })

  test('handles text input', () => {
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    expect(textInput.value).toBe('Test text')
  })

  test('handles text analysis automatically', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 9,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([
      { codepoint: 84, hex: 'U+0054', isInvisible: false, name: 'LATIN CAPITAL LETTER T' }
    ])
    mockGetGraphemeClusters.mockReturnValue(['T', 'e', 's', 't', ' ', 't', 'e', 'x', 't'])
    mockCheckNormalization.mockReturnValue({
      original: 'Test text',
      nfc: 'Test text',
      nfkc: 'Test text',
      nfcChanged: false,
      nfkcChanged: false
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(mockAnalyzeInvisibleChars).toHaveBeenCalledWith('Test text')
      expect(mockGetCodepointBreakdown).toHaveBeenCalledWith('Test text')
      expect(mockGetGraphemeClusters).toHaveBeenCalledWith('Test text')
      expect(mockCheckNormalization).toHaveBeenCalledWith('Test text')
    })
  })

  test('shows analysis results', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 9,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([
      { codepoint: 84, hex: 'U+0054', isInvisible: false, name: 'LATIN CAPITAL LETTER T' }
    ])
    mockGetGraphemeClusters.mockReturnValue(['T', 'e', 's', 't', ' ', 't', 'e', 'x', 't'])
    mockCheckNormalization.mockReturnValue({
      original: 'Test text',
      nfc: 'Test text',
      nfkc: 'Test text',
      nfcChanged: false,
      nfkcChanged: false
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(screen.getByText('Quick Overview')).toBeInTheDocument()
    })
  })

  test('handles clear button', () => {
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    const clearButton = screen.getByText('Clear')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    fireEvent.click(clearButton)
    
    expect(textInput.value).toBe('')
  })

  test('handles example button', () => {
    render(<ScanPage />)
    
    const exampleButton = screen.getByText('Normal Text')
    fireEvent.click(exampleButton)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    expect(textInput.value).toBe('Hello 👋 world! This is a test with some emoji 🎉 and special characters.')
  })

  test('shows invisible characters when detected', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [
        { char: '\uFE0E', name: 'VARIATION SELECTOR-15', codepoint: 0xFE0E, count: 1 }
      ],
      invisibleCount: 1,
      totalChars: 10,
      invisibleRatio: 0.1
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(screen.getByText('Invisible Characters')).toBeInTheDocument()
    })
  })

  test('shows grapheme cluster analysis', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 10,
      invisibleRatio: 0
    })
    mockGetGraphemeClusters.mockReturnValue(['👋', ' ', 'World', '!', ' ', '🎉'])
    mockGetCodepointBreakdown.mockReturnValue([])
    mockCheckNormalization.mockReturnValue({
      original: '👋 World! 🎉',
      nfc: '👋 World! 🎉',
      nfkc: '👋 World! 🎉',
      nfcChanged: false,
      nfkcChanged: false
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: '👋 World! 🎉' } })
    
    await waitFor(() => {
      expect(screen.getByText('Grapheme Clusters')).toBeInTheDocument()
    })
  })

  test('shows normalization analysis', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 9,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([])
    mockGetGraphemeClusters.mockReturnValue(['T', 'e', 's', 't', ' ', 't', 'e', 'x', 't'])
    mockCheckNormalization.mockReturnValue({
      original: 'Test text',
      nfc: 'Test text',
      nfkc: 'Test text',
      nfcChanged: false,
      nfkcChanged: false
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(screen.getByText('Normalization Analysis')).toBeInTheDocument()
    })
  })

  test('handles different example buttons', () => {
    render(<ScanPage />)
    
    // Test Tail Mode example
    const tailButton = screen.getByText('Tail Mode')
    fireEvent.click(tailButton)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    expect(textInput.value).toContain('Hello world')
    
    // Test Interleaved example
    const interleavedButton = screen.getByText('Interleaved')
    fireEvent.click(interleavedButton)
    
    expect(textInput.value).toContain('H')
    
    // Test ZWJ-Aware example
    const zwjButton = screen.getByText('ZWJ-Aware')
    fireEvent.click(zwjButton)
    
    expect(textInput.value).toContain('H')
  })

  test('handles analysis with different invisible characters', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [
        { char: '\uFE0E', name: 'VARIATION SELECTOR-15', codepoint: 0xFE0E, count: 2 },
        { char: '\uFE0F', name: 'VARIATION SELECTOR-16', codepoint: 0xFE0F, count: 1 }
      ],
      invisibleCount: 3,
      totalChars: 15,
      invisibleRatio: 0.2
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text with invisible chars' } })
    
    await waitFor(() => {
      expect(screen.getByText('Invisible Characters')).toBeInTheDocument()
    })
  })

  test('handles normalization changes', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 9,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([])
    mockGetGraphemeClusters.mockReturnValue(['T', 'e', 's', 't', ' ', 't', 'e', 'x', 't'])
    mockCheckNormalization.mockReturnValue({
      original: 'Test text',
      nfc: 'Test text normalized',
      nfkc: 'Test text normalized',
      nfcChanged: true,
      nfkcChanged: true
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(screen.getByText('Normalization Analysis')).toBeInTheDocument()
    })
  })

  test('handles empty text input', () => {
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    fireEvent.change(textInput, { target: { value: '' } })
    
    expect(textInput.value).toBe('')
  })

  test('handles component unmounting', () => {
    const { unmount } = render(<ScanPage />)
    
    unmount()
  })

  test('renders all analysis sections', async () => {
    mockAnalyzeInvisibleChars.mockReturnValue({
      invisibleChars: [],
      invisibleCount: 0,
      totalChars: 9,
      invisibleRatio: 0
    })
    mockGetCodepointBreakdown.mockReturnValue([
      { codepoint: 84, hex: 'U+0054', isInvisible: false, name: 'LATIN CAPITAL LETTER T' }
    ])
    mockGetGraphemeClusters.mockReturnValue(['T', 'e', 's', 't', ' ', 't', 'e', 'x', 't'])
    mockCheckNormalization.mockReturnValue({
      original: 'Test text',
      nfc: 'Test text',
      nfkc: 'Test text',
      nfcChanged: false,
      nfkcChanged: false
    })
    
    render(<ScanPage />)
    
    const textInput = screen.getByPlaceholderText('Enter text to analyze...')
    fireEvent.change(textInput, { target: { value: 'Test text' } })
    
    await waitFor(() => {
      expect(screen.getByText('Quick Overview')).toBeInTheDocument()
      expect(screen.getByText('Codepoint Analysis')).toBeInTheDocument()
      expect(screen.getByText('Grapheme Clusters')).toBeInTheDocument()
      expect(screen.getByText('Normalization Analysis')).toBeInTheDocument()
    })
  })
})
