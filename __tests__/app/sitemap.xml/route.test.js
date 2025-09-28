import { GET } from '@/app/sitemap.xml/route'

// Mock Next.js request
const mockRequest = {
  url: 'https://chinmay29hub-stegmoji.vercel.app'
}

describe('Sitemap Route', () => {
  test('returns valid XML sitemap', async () => {
    const response = await GET(mockRequest)
    
    expect(response).toBeDefined()
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('application/xml')
  })

  test('sitemap contains expected URLs', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    expect(xmlContent).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xmlContent).toContain('<urlset')
    expect(xmlContent).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    expect(xmlContent).toContain('<url>')
    expect(xmlContent).toContain('<loc>')
    expect(xmlContent).toContain('<lastmod>')
    expect(xmlContent).toContain('<changefreq>')
    expect(xmlContent).toContain('<priority>')
    expect(xmlContent).toContain('</urlset>')
  })

  test('sitemap includes main pages', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    expect(xmlContent).toContain('https://chinmay29hub-stegmoji.vercel.app/')
    expect(xmlContent).toContain('https://chinmay29hub-stegmoji.vercel.app/encode')
    expect(xmlContent).toContain('https://chinmay29hub-stegmoji.vercel.app/decode')
    expect(xmlContent).toContain('https://chinmay29hub-stegmoji.vercel.app/scan')
    expect(xmlContent).toContain('https://chinmay29hub-stegmoji.vercel.app/about')
  })

  test('sitemap has correct structure for each URL', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    // Check that each URL has the required elements
    const urlMatches = xmlContent.match(/<url>[\s\S]*?<\/url>/g)
    expect(urlMatches).toBeDefined()
    expect(urlMatches.length).toBeGreaterThan(0)
    
    urlMatches.forEach(urlBlock => {
      expect(urlBlock).toContain('<loc>')
      expect(urlBlock).toContain('<lastmod>')
      expect(urlBlock).toContain('<changefreq>')
      expect(urlBlock).toContain('<priority>')
    })
  })

  test('sitemap has correct priorities', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    // Home page should have highest priority
    expect(xmlContent).toContain('<priority>1</priority>')
    // Other pages should have lower priority
    expect(xmlContent).toContain('<priority>0.8</priority>')
  })

  test('sitemap has correct change frequencies', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    expect(xmlContent).toContain('<changefreq>weekly</changefreq>')
    expect(xmlContent).toContain('<changefreq>monthly</changefreq>')
  })

  test('sitemap has valid lastmod dates', async () => {
    const response = await GET(mockRequest)
    const xmlContent = await response.text()
    
    // Check that lastmod dates are in ISO format
    const lastmodMatches = xmlContent.match(/<lastmod>(.*?)<\/lastmod>/g)
    expect(lastmodMatches).toBeDefined()
    expect(lastmodMatches.length).toBeGreaterThan(0)
    
    lastmodMatches.forEach(lastmod => {
      const dateMatch = lastmod.match(/<lastmod>(.*?)<\/lastmod>/)
      if (dateMatch) {
        const dateString = dateMatch[1]
        const date = new Date(dateString)
        expect(date).toBeInstanceOf(Date)
        expect(date.getTime()).not.toBeNaN()
      }
    })
  })
})
