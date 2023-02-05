<?php

namespace App\Services;

use App\Models\Domain;
use App\Models\Page;

class DomainService
{
    public function __construct()
    {
    }

    public static function updateOrCreateSitemap(Domain $domain)
    {
        try {
            $pages = self::fetchSitemap($domain->sitemap);

            //create Pages
            foreach ($pages as $sitemapPage) {
                Page::firstOrCreate([
                    'domain_id' => $domain->id,
                    'url' => $sitemapPage,
                ]);
                $domain->update(['sitemapFound' => '1']);
            }
        } catch (\e) {
            $domain->update(['sitemapFound' => '0']);
        }
    }

    public static function fetchSitemap(string $url)
    {

        $xml = simplexml_load_file($url);
        $pages = [];

        // get page urls from sitemap
        foreach ($xml as $element) {
            $pages[] = $element->loc[0];
        }
        return $pages;
    }
}

