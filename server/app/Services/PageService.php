<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Support\Facades\Http;

class PageService
{


    public static function rate(Page $page): Page
    {
        $api_rating = self::getRating($page->url);
        error_log('Page Rated : '.$page->url);
        self::setRating($page, $api_rating);
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

    public static function setRating(Page $page, $rating): void
    {
        $page->loadCount('ratings');
        $ratings_count = $page->ratings_count;
        if ($ratings_count > 10) {
            //Delete older Ratings
            $ratings = $page->load('ratings')->ratings;
            for ($i = 9; $i < count($ratings); $i++) {
                $ratings[$i]->delete();
            }
        }
        $page->ratings()->create($rating);
        $page->touch();
    }

}
