<?php

namespace App\Observers;

use App\Events\UpdateCreateSitemap;
use App\Jobs\CreateSitemap;
use App\Models\Domain;
use App\Models\Page;
use App\Models\Rating;
use App\Services\DomainService;
use App\Services\RateService;

class DomainObserver
{
    /**
     * Handle the Domain "created" event.
     *
     * @param  \App\Models\Domain  $domain
     * @return void
     */
    public function created(Domain $domain)
    {
        dispatch(new CreateSitemap($domain));
    }

    /**
     * Handle the Domain "updated" event.
     *
     * @param  \App\Models\Domain  $domain
     * @return void
     */
    public function updated(Domain $domain)
    {
        // TODO updated Domain
        error_log('Domain Observer Update');
        $domain->load(['pages', 'rating']);
        $count = count($domain->pages);
        $ratings = [
            'seo' => 0,
            'performance' => 0,
            'accessibility' => 0,
        ];
        foreach ($domain->pages as $page) {
            $ratings['seo'] += $page->averageRatings->seo;
            $ratings['performance'] += $page->averageRatings->performance;
            $ratings['accessibility'] += $page->averageRatings->accessibility;
        }
        error_log('Updating Domain Rating:', $ratings, $count);
    }

    /**
     * Handle the Domain "deleted" event.
     *
     * @param  \App\Models\Domain  $domain
     * @return void
     */
    public function deleted(Domain $domain)
    {
        //
    }

    /**
     * Handle the Domain "restored" event.
     *
     * @param  \App\Models\Domain  $domain
     * @return void
     */
    public function restored(Domain $domain)
    {
        //
    }

    /**
     * Handle the Domain "force deleted" event.
     *
     * @param  \App\Models\Domain  $domain
     * @return void
     */
    public function forceDeleted(Domain $domain)
    {
        //
    }
}
