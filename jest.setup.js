import '@testing-library/jest-dom'

// Mock Web Crypto API for testing
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    },
    subtle: {
      importKey: jest.fn().mockResolvedValue({}),
      deriveKey: jest.fn().mockResolvedValue({}),
      encrypt: jest.fn().mockImplementation(async (algorithm, key, data) => {
        // Return the original data as "encrypted" for testing
        return data
      }),
      decrypt: jest.fn().mockImplementation(async (algorithm, key, data) => {
        // Return the original data as "decrypted" for testing
        return data
      }),
    },
  },
  writable: true,
})

// Mock TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
  },
})

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url')
global.URL.revokeObjectURL = jest.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Next.js components
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, ...props }) => {
    return <script {...props}>{children}</script>
  },
}))

// Mock grapheme-splitter
jest.mock('grapheme-splitter', () => ({
  __esModule: true,
  default: class GraphemeSplitter {
    splitGraphemes(text) {
      return text.split('')
    }
  },
}))

// Mock pako for compression
jest.mock('pako', () => ({
  deflate: jest.fn((data) => new Uint8Array(data)),
  inflate: jest.fn((data) => new Uint8Array(data)),
}))

// Mock Response for sitemap tests
global.Response = jest.fn().mockImplementation((body, init) => ({
  text: jest.fn().mockResolvedValue(body),
  headers: {
    get: jest.fn((key) => {
      const headers = init?.headers || {}
      return headers[key] || headers['content-type'] || 'application/xml'
    })
  },
  status: init?.status || 200,
  statusText: init?.statusText || 'OK',
}))
