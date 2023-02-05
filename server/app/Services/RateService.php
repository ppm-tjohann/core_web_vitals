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
        $seo = 0;
        $performance = 0;
        $accessibility = 0;
        $counter = 0;
        foreach ($ratings as $rating) {
            $counter++;
            if ($rating === null) {
                $counter--;
                continue;
            }

            $seo += $rating->seo;
            $performance += $rating->performance;
            $accessibility += $rating->accessibility;
        }

        if ($seo === 0 || $performance === 0 || $accessibility === 0) {
            return $defaultRating->delete();
        }
        $new_ratings = [
            'seo' => round($seo / $counter),
            'performance' => round($performance / $counter),
            'accessibility' => round($accessibility / $counter),
        ];
        $defaultRating->update($new_ratings);
        return $new_ratings;
    }
}
