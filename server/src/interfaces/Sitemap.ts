export interface SitemapPage {
    loc: string,
    lastmod: string,
    changefreq: string,
    priority: string
}

export interface Sitemap {
    urlset: {
        xmlns: string,
        url: SitemapPage[],
    }
}