<?php

namespace App\Services;

use App\Models\Rating;

class RateService
{

    public static function createInitialRating(): Rating
    {
        return new Rating([
            'seo' => 0, 'performance' => 0, 'accessibility' => 0
        ]);
    }

    public static function getDefaultRatings(Rating $defaultRating, $ratings)
    {
        $count = count($ratings);
        $new_ratings = [
            'seo' => 0,
            'performance' => 0,
            'accessibility' => 0,
        ];
        foreach ($ratings as $rating) {
            $new_ratings['seo'] += $rating->seo;
            $new_ratings['performance'] += $rating->performance;
            $new_ratings['accessibility'] += $rating->accessibility;
        }
        $new_ratings = [
            'seo' => round($rating->seo / $count),
            'performance' => round($rating->performance / $count),
            'accessibility' => round($rating->accessibility / $count),
        ];
        $defaultRating->update($new_ratings);
        error_log('Ratings Updated');
    }
}
