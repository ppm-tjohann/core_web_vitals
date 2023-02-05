<?php

namespace App\Observers;

use App\Models\Page;
use App\Services\RateService;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     *
     * @param  \App\Models\Page  $page
     * @return void
     */
    public function created(Page $page)
    {
    }

    /**
     * Handle the Page "updated" event.
     *
     * @param  \App\Models\Page  $page
     * @return void
     */
    public function updated(Page $page)
    {
        $page->load(['averageRatings', 'ratings']);
        $averageRatings = $page->averageRatings === null ? RateService::createInitialRating()
            : $page->averageRatings;

        RateService::getDefaultRatings($averageRatings, $page->ratings);

        if (count($page->ratings) > 10) {
            for ($i = 9; $i < count($page->ratings); $i++) {
                $rating = $page->ratings[$i];
                $rating->delete();
            }
        }
    }

    /**
     * Handle the Page "deleted" event.
     *
     * @param  \App\Models\Page  $page
     * @return void
     */
    public function deleted(Page $page)
    {
        //
    }

    /**
     * Handle the Page "restored" event.
     *
     * @param  \App\Models\Page  $page
     * @return void
     */
    public function restored(Page $page)
    {
        //
    }

    /**
     * Handle the Page "force deleted" event.
     *
     * @param  \App\Models\Page  $page
     * @return void
     */
    public function forceDeleted(Page $page)
    {
        //
    }
}
