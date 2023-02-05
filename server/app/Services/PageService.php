<?php

namespace App\Services;

use App\Models\Page;
use App\Models\Rating;
use Illuminate\Support\Facades\Http;

class PageService
{


    public static function rate(Page $page): Rating
    {
        $api_rating = self::getRating($page->url);
        return self::setRating($page, $api_rating);
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

    public static function setRating(Page $page, $rating): Rating
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
        $rating = new Rating($rating);

        $page->ratings()->save($rating);
        $page->touch();
        return $rating;
    }

}
