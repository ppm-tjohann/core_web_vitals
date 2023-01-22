<?php

namespace App\Jobs;

use App\Models\Domain;
use App\Services\RateService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DefaultRatings implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $domains = Domain::with('pages', 'rating', 'pages.averageRatings')
            ->get();


        foreach ($domains as $domain) {
            if ($domain->rating === null) {
                $domain_rating = RateService::createInitialRating();
                $domain->rating()->save($domain_rating);
                continue;
            }


            $page_ratings = [];
            foreach ($domain->pages as $page) {
                $page_ratings[] = $page->averageRatings;
            }


            RateService::getDefaultRatings($domain->rating, $page_ratings);

        }
    }
}
