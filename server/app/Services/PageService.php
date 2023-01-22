<?php

namespace App\Services;

use App\Models\Page;
use App\Models\Rating;
use Illuminate\Support\Facades\Http;

class PageService
{


    public static function rate(Page $page): Page
    {
        $api_rating = self::getRating($page->url);
        error_log('Page Rated : '.$page->url);
        $page->ratings()->create($api_rating);
        $page->touch();
        return $page;
    }

    public static function getRating($url)
    {
        $key = env('GOOGLE_CWV_KEY');

        $url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='.$url.'&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO&strategy=MOBILE&key='.$key;
        $response = Http::get($url);
        $json = $response->json();
        $ratings = $json['lighthouseResult']['categories'];


        return [
            'seo' => $ratings['seo']['score'] * 100,
            'performance' => $ratings['performance']['score'] * 100,
            'accessibility' => $ratings['accessibility']['score'] * 100,
        ];
    }
}
