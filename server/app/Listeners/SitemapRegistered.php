<?php

namespace App\Listeners;

use App\Events\UpdateCreateSitemap;
use App\Services\DomainService;
use Database\Seeders\DomainSeeder;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SitemapRegistered
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\UpdateCreateSitemap  $event
     * @return void
     */
    public function handle(UpdateCreateSitemap $event)
    {
        error_log('Sitemap Registerred Listener');
        $domain = $event->domain;
        DomainService::updateOrCreateSitemap($domain);
    }
}
