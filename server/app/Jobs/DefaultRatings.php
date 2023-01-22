<?php

namespace App\Jobs;

use App\Models\Domain;
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
        $domains = Domain::with('pages', 'pages.averageRatings',
            'pages.ratings')->get();
        foreach ($domains as $domain) {
            $pages = $domain->pages;
            foreach ($pages as $page) {
                $defaultRatings = [
                    'seo' => 0,
                    'performance' => 0,
                    'accessibility' => 0,
                ];
                $ratingsCount = count($page->ratings);
                foreach ($page->ratings as $rating) {
                    $defaultRatings['seo'] += $rating->seo;
                    $defaultRatings['performance'] += $rating->performance;
                    $defaultRatings['accessibility'] += $rating->accessibility;
                }

                $defaultRatings['seo'] = round($defaultRatings['seo'] / $ratingsCount);
                $defaultRatings['performance'] = round($defaultRatings['performance'] / $ratingsCount);
                $defaultRatings['accessibility'] = round($defaultRatings['accessibility'] / $ratingsCount);

                error_log('Page Defaults : ', $defaultRatings);

                // $page->averageRatings()->create($defaultRatings);
            }
        }
    }
}
