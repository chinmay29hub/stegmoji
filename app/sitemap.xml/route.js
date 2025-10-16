export async function GET() {
  const baseUrl = 'https://chinmay29hub-stegmoji.vercel.app'
  const currentDate = new Date().toISOString()

  const pages = [
    {
      url: '',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: '/encode',
      lastModified: currentDate,
      changeFrequency: 'weekly', 
      priority: 0.9
    },
    {
      url: '/decode',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: '/scan',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: '/about',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
