import { render, screen, act } from '@testing-library/react'
import HomePage from '@/app/page'

// Lightweight framer-motion stand-in: renders the underlying element and drops
// animation-only props so React doesn't warn about unknown DOM attributes.
jest.mock('framer-motion', () => {
  const React = require('react')

  const ANIMATION_PROPS = new Set([
    'animate',
    'initial',
    'exit',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'whileInView',
    'viewport',
    'layout',
    'layoutId',
    'drag',
    'dragConstraints',
    'onAnimationComplete',
  ])

  const stripAnimationProps = (props) =>
    Object.fromEntries(Object.entries(props).filter(([key]) => !ANIMATION_PROPS.has(key)))

  const motion = new Proxy(
    {},
    {
      get: (_target, tag) => {
        const Component = React.forwardRef(({ children, ...props }, ref) =>
          React.createElement(tag, { ref, ...stripAnimationProps(props) }, children)
        )
        Component.displayName = `motion.${String(tag)}`
        return Component
      },
    }
  )

  return { motion, AnimatePresence: ({ children }) => children }
})

describe('HomePage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('renders the hero heading and subheading', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Free Unicode Steganography Tool/i
    )
    expect(screen.getByText(/Hide secret messages inside text/i)).toBeInTheDocument()
  })

  test('renders both hero call-to-action buttons', () => {
    render(<HomePage />)

    expect(screen.getByRole('button', { name: /start encoding/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /decode message/i })).toBeInTheDocument()
  })

  test('links to every tool page', () => {
    render(<HomePage />)

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'))

    expect(hrefs).toContain('/encode')
    expect(hrefs).toContain('/decode')
    expect(hrefs).toContain('/scan')
    expect(hrefs).toContain('/about')
  })

  test('renders the feature and benefit sections', () => {
    render(<HomePage />)

    expect(screen.getByText(/How Unicode Steganography Works/i)).toBeInTheDocument()
    expect(screen.getByText(/Privacy-First Design/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Why Choose Stegmoji\?/i })).toBeInTheDocument()
    // Exact strings: "Secure" also appears inside the hero subheading prose.
    expect(screen.getByText('Secure')).toBeInTheDocument()
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Compatible')).toBeInTheDocument()
  })

  test('types out the visible demo text over time', () => {
    render(<HomePage />)

    // Typing runs on a 150ms interval, one character per tick.
    act(() => {
      jest.advanceTimersByTime(150 * 3)
    })

    expect(screen.getByText(/^Hel/)).toBeInTheDocument()
  })

  test('reveals the hidden demo message after the visible text finishes', () => {
    render(<HomePage />)

    // 14 visible chars at 150ms, a 1s pause, then the hidden text at 100ms/char.
    act(() => {
      jest.advanceTimersByTime(150 * 15 + 1000 + 100 * 21)
    })

    expect(screen.getByText(/Secret Message/)).toBeInTheDocument()
    expect(screen.getByText(/Hidden message revealed/i)).toBeInTheDocument()
  })

  test('unmounts without throwing', () => {
    const { unmount } = render(<HomePage />)

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(() => unmount()).not.toThrow()
  })

  test('cancels every animation timer on unmount', () => {
    const { unmount } = render(<HomePage />)

    // Unmount mid-animation, the way a user navigating away would.
    act(() => {
      jest.advanceTimersByTime(500)
    })
    unmount()

    expect(jest.getTimerCount()).toBe(0)
  })

  test('never renders a split emoji while typing', () => {
    const { container } = render(<HomePage />)

    // A high surrogate not followed by a low surrogate is half an emoji,
    // which the browser renders as the replacement character.
    const loneSurrogate = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/

    // Step through the whole animation one tick at a time.
    for (let elapsed = 0; elapsed <= 8000; elapsed += 50) {
      act(() => {
        jest.advanceTimersByTime(50)
      })
      expect(container.textContent).not.toMatch(loneSurrogate)
    }
  })
})
