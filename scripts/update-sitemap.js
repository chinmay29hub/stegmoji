#!/usr/bin/env node

/**
 * Script to update the static sitemap.xml file
 * Run this after making changes to your site structure
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://chinmay29hub-stegmoji.vercel.app';
const currentDate = new Date().toISOString();

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
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

try {
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Sitemap updated successfully!');
  console.log(`📁 Location: ${sitemapPath}`);
  console.log(`🌐 URL: ${baseUrl}/sitemap.xml`);
} catch (error) {
  console.error('❌ Error updating sitemap:', error.message);
  process.exit(1);
}
