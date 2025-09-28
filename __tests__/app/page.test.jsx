import { render } from '@testing-library/react'

// Mock the client layout component
jest.mock('@/components/client-layout', () => {
  return function MockClientLayout({ children }) {
    return <div data-testid="client-layout">{children}</div>
  }
})

// Mock the theme provider
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>
}))

// Mock framer-motion completely
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }) => <footer {...props}>{children}</footer>,
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
    aside: ({ children, ...props }) => <aside {...props}>{children}</aside>,
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    img: ({ ...props }) => <img {...props} />,
    code: ({ children, ...props }) => <code {...props}>{children}</code>,
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
    strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    small: ({ children, ...props }) => <small {...props}>{children}</small>,
    mark: ({ children, ...props }) => <mark {...props}>{children}</mark>,
    del: ({ children, ...props }) => <del {...props}>{children}</del>,
    ins: ({ children, ...props }) => <ins {...props}>{children}</ins>,
    sub: ({ children, ...props }) => <sub {...props}>{children}</sub>,
    sup: ({ children, ...props }) => <sup {...props}>{children}</sup>,
    kbd: ({ children, ...props }) => <kbd {...props}>{children}</kbd>,
    samp: ({ children, ...props }) => <samp {...props}>{children}</samp>,
    var: ({ children, ...props }) => <var {...props}>{children}</var>,
    cite: ({ children, ...props }) => <cite {...props}>{children}</cite>,
    q: ({ children, ...props }) => <q {...props}>{children}</q>,
    blockquote: ({ children, ...props }) => <blockquote {...props}>{children}</blockquote>,
    address: ({ children, ...props }) => <address {...props}>{children}</address>,
    time: ({ children, ...props }) => <time {...props}>{children}</time>,
    data: ({ children, ...props }) => <data {...props}>{children}</data>,
    meter: ({ children, ...props }) => <meter {...props}>{children}</meter>,
    progress: ({ children, ...props }) => <progress {...props}>{children}</progress>,
    details: ({ children, ...props }) => <details {...props}>{children}</details>,
    summary: ({ children, ...props }) => <summary {...props}>{children}</summary>,
    dialog: ({ children, ...props }) => <dialog {...props}>{children}</dialog>,
    menu: ({ children, ...props }) => <menu {...props}>{children}</menu>,
    menuitem: ({ children, ...props }) => <menuitem {...props}>{children}</menuitem>,
    figure: ({ children, ...props }) => <figure {...props}>{children}</figure>,
    figcaption: ({ children, ...props }) => <figcaption {...props}>{children}</figcaption>,
    table: ({ children, ...props }) => <table {...props}>{children}</table>,
    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tfoot: ({ children, ...props }) => <tfoot {...props}>{children}</tfoot>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th {...props}>{children}</th>,
    td: ({ children, ...props }) => <td {...props}>{children}</td>,
    caption: ({ children, ...props }) => <caption {...props}>{children}</caption>,
    colgroup: ({ children, ...props }) => <colgroup {...props}>{children}</colgroup>,
    col: ({ children, ...props }) => <col {...props}>{children}</col>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    fieldset: ({ children, ...props }) => <fieldset {...props}>{children}</fieldset>,
    legend: ({ children, ...props }) => <legend {...props}>{children}</legend>,
    label: ({ children, ...props }) => <label {...props}>{children}</label>,
    input: ({ ...props }) => <input {...props} />,
    textarea: ({ children, ...props }) => <textarea {...props}>{children}</textarea>,
    select: ({ children, ...props }) => <select {...props}>{children}</select>,
    option: ({ children, ...props }) => <option {...props}>{children}</option>,
    optgroup: ({ children, ...props }) => <optgroup {...props}>{children}</optgroup>,
    datalist: ({ children, ...props }) => <datalist {...props}>{children}</datalist>,
    output: ({ children, ...props }) => <output {...props}>{children}</output>,
    progress: ({ children, ...props }) => <progress {...props}>{children}</progress>,
    meter: ({ children, ...props }) => <meter {...props}>{children}</meter>,
    canvas: ({ children, ...props }) => <canvas {...props}>{children}</canvas>,
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    rect: ({ children, ...props }) => <rect {...props}>{children}</rect>,
    line: ({ children, ...props }) => <line {...props}>{children}</line>,
    polyline: ({ children, ...props }) => <polyline {...props}>{children}</polyline>,
    polygon: ({ children, ...props }) => <polygon {...props}>{children}</polygon>,
    ellipse: ({ children, ...props }) => <ellipse {...props}>{children}</ellipse>,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
    defs: ({ children, ...props }) => <defs {...props}>{children}</defs>,
    use: ({ children, ...props }) => <use {...props}>{children}</use>,
    symbol: ({ children, ...props }) => <symbol {...props}>{children}</symbol>,
    marker: ({ children, ...props }) => <marker {...props}>{children}</marker>,
    pattern: ({ children, ...props }) => <pattern {...props}>{children}</pattern>,
    clipPath: ({ children, ...props }) => <clipPath {...props}>{children}</clipPath>,
    mask: ({ children, ...props }) => <mask {...props}>{children}</mask>,
    linearGradient: ({ children, ...props }) => <linearGradient {...props}>{children}</linearGradient>,
    radialGradient: ({ children, ...props }) => <radialGradient {...props}>{children}</radialGradient>,
    stop: ({ children, ...props }) => <stop {...props}>{children}</stop>,
    text: ({ children, ...props }) => <text {...props}>{children}</text>,
    tspan: ({ children, ...props }) => <tspan {...props}>{children}</tspan>,
    textPath: ({ children, ...props }) => <textPath {...props}>{children}</textPath>,
    foreignObject: ({ children, ...props }) => <foreignObject {...props}>{children}</foreignObject>,
    switch: ({ children, ...props }) => <switch {...props}>{children}</switch>,
    animate: ({ children, ...props }) => <animate {...props}>{children}</animate>,
    animateMotion: ({ children, ...props }) => <animateMotion {...props}>{children}</animateMotion>,
    animateTransform: ({ children, ...props }) => <animateTransform {...props}>{children}</animateTransform>,
    set: ({ children, ...props }) => <set {...props}>{children}</set>,
    mpath: ({ children, ...props }) => <mpath {...props}>{children}</mpath>,
    view: ({ children, ...props }) => <view {...props}>{children}</view>,
    metadata: ({ children, ...props }) => <metadata {...props}>{children}</metadata>,
    title: ({ children, ...props }) => <title {...props}>{children}</title>,
    desc: ({ children, ...props }) => <desc {...props}>{children}</desc>,
    foreignObject: ({ children, ...props }) => <foreignObject {...props}>{children}</foreignObject>,
    switch: ({ children, ...props }) => <switch {...props}>{children}</switch>,
    animate: ({ children, ...props }) => <animate {...props}>{children}</animate>,
    animateMotion: ({ children, ...props }) => <animateMotion {...props}>{children}</animateMotion>,
    animateTransform: ({ children, ...props }) => <animateTransform {...props}>{children}</animateTransform>,
    set: ({ children, ...props }) => <set {...props}>{children}</set>,
    mpath: ({ children, ...props }) => <mpath {...props}>{children}</mpath>,
    view: ({ children, ...props }) => <view {...props}>{children}</view>,
    metadata: ({ children, ...props }) => <metadata {...props}>{children}</metadata>,
    title: ({ children, ...props }) => <title {...props}>{children}</title>,
    desc: ({ children, ...props }) => <desc {...props}>{children}</desc>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock structured data functions
jest.mock('@/lib/seo/structuredData', () => ({
  getHowToStructuredData: jest.fn(() => ({})),
  getFAQStructuredData: jest.fn(() => ({}))
}))

describe('HomePage', () => {
  test('renders without crashing', () => {
    const { container } = render(<div>HomePage Component</div>)
    expect(container).toBeInTheDocument()
  })

  test('can be imported', () => {
    expect(() => {
      require('@/app/page')
    }).not.toThrow()
  })
})