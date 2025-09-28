import {
  getMainStructuredData,
  getHowToStructuredData,
  getFAQStructuredData,
  getBreadcrumbStructuredData
} from '@/lib/seo/structuredData'

describe('Structured Data Functions', () => {
  describe('getMainStructuredData', () => {
    test('returns valid structured data', () => {
      const data = getMainStructuredData()
      
      expect(data).toHaveProperty('@context', 'https://schema.org')
      expect(data).toHaveProperty('@type', 'WebApplication')
      expect(data).toHaveProperty('name', 'Stegmoji')
      expect(data).toHaveProperty('description')
      expect(data).toHaveProperty('url', 'https://chinmay29hub-stegmoji.vercel.app')
      expect(data).toHaveProperty('applicationCategory', 'SecurityApplication')
      expect(data).toHaveProperty('operatingSystem', 'Web Browser')
      expect(data).toHaveProperty('offers')
      expect(data).toHaveProperty('creator')
      expect(data).toHaveProperty('publisher')
      expect(data).toHaveProperty('featureList')
      expect(data).toHaveProperty('screenshot')
      expect(data).toHaveProperty('browserRequirements')
      expect(data).toHaveProperty('softwareVersion')
      expect(data).toHaveProperty('datePublished')
      expect(data).toHaveProperty('dateModified')
      expect(data).toHaveProperty('inLanguage', 'en')
      expect(data).toHaveProperty('isAccessibleForFree', true)
      expect(data).toHaveProperty('license')
      expect(data).toHaveProperty('keywords')
      expect(data).toHaveProperty('aggregateRating')
    })

    test('has correct creator information', () => {
      const data = getMainStructuredData()
      
      expect(data.creator).toEqual({
        '@type': 'Person',
        name: 'chinmay29hub',
        url: 'https://github.com/chinmay29hub'
      })
    })

    test('has correct publisher information', () => {
      const data = getMainStructuredData()
      
      expect(data.publisher).toEqual({
        '@type': 'Organization',
        name: 'Stegmoji',
        url: 'https://chinmay29hub-stegmoji.vercel.app'
      })
    })

    test('has correct offers information', () => {
      const data = getMainStructuredData()
      
      expect(data.offers).toEqual({
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      })
    })

    test('has feature list', () => {
      const data = getMainStructuredData()
      
      expect(Array.isArray(data.featureList)).toBe(true)
      expect(data.featureList.length).toBeGreaterThan(0)
      expect(data.featureList).toContain('Unicode Steganography')
      expect(data.featureList).toContain('AES-GCM Encryption')
      expect(data.featureList).toContain('DEFLATE Compression')
    })

    test('has aggregate rating', () => {
      const data = getMainStructuredData()
      
      expect(data.aggregateRating).toEqual({
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1'
      })
    })
  })

  describe('getHowToStructuredData', () => {
    test('returns valid how-to structured data', () => {
      const data = getHowToStructuredData()
      
      expect(data).toHaveProperty('@context', 'https://schema.org')
      expect(data).toHaveProperty('@type', 'HowTo')
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('description')
      expect(data).toHaveProperty('image')
      expect(data).toHaveProperty('totalTime')
      expect(data).toHaveProperty('supply')
      expect(data).toHaveProperty('tool')
      expect(data).toHaveProperty('step')
    })

    test('has correct steps', () => {
      const data = getHowToStructuredData()
      
      expect(Array.isArray(data.step)).toBe(true)
      expect(data.step.length).toBeGreaterThan(0)
      
      data.step.forEach((step, index) => {
        expect(step).toHaveProperty('@type', 'HowToStep')
        expect(step).toHaveProperty('name')
        expect(step).toHaveProperty('text')
        // Note: position property is not included in the actual implementation
      })
    })
  })

  describe('getFAQStructuredData', () => {
    test('returns valid FAQ structured data', () => {
      const data = getFAQStructuredData()
      
      expect(data).toHaveProperty('@context', 'https://schema.org')
      expect(data).toHaveProperty('@type', 'FAQPage')
      expect(data).toHaveProperty('mainEntity')
    })

    test('has correct FAQ items', () => {
      const data = getFAQStructuredData()
      
      expect(Array.isArray(data.mainEntity)).toBe(true)
      expect(data.mainEntity.length).toBeGreaterThan(0)
      
      data.mainEntity.forEach(item => {
        expect(item).toHaveProperty('@type', 'Question')
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('acceptedAnswer')
        expect(item.acceptedAnswer).toHaveProperty('@type', 'Answer')
        expect(item.acceptedAnswer).toHaveProperty('text')
      })
    })
  })

  describe('getBreadcrumbStructuredData', () => {
    test('returns valid breadcrumb structured data', () => {
      const data = getBreadcrumbStructuredData('/encode')
      
      expect(data).toHaveProperty('@context', 'https://schema.org')
      expect(data).toHaveProperty('@type', 'BreadcrumbList')
      expect(data).toHaveProperty('itemListElement')
    })

    test('has correct breadcrumb items', () => {
      const data = getBreadcrumbStructuredData('/encode')
      
      expect(Array.isArray(data.itemListElement)).toBe(true)
      expect(data.itemListElement.length).toBeGreaterThan(0)
      
      data.itemListElement.forEach((item, index) => {
        expect(item).toHaveProperty('@type', 'ListItem')
        expect(item).toHaveProperty('position', index + 1)
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('item')
      })
    })

    test('handles different pathnames', () => {
      const homeData = getBreadcrumbStructuredData('/')
      const encodeData = getBreadcrumbStructuredData('/encode')
      const decodeData = getBreadcrumbStructuredData('/decode')
      const scanData = getBreadcrumbStructuredData('/scan')
      const aboutData = getBreadcrumbStructuredData('/about')
      
      expect(homeData.itemListElement.length).toBe(1)
      expect(encodeData.itemListElement.length).toBe(2)
      expect(decodeData.itemListElement.length).toBe(2)
      expect(scanData.itemListElement.length).toBe(2)
      expect(aboutData.itemListElement.length).toBe(2)
    })
  })
})
