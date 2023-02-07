<?php

namespace App\Jobs;

use App\Models\Page;
use App\Models\Rating;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateDefaultPageRatings implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Page $page;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Page $page)
    {
        $this->page = $page;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        error_log('Updating Default Ratings');
        $rating = $this->getAverage($this->page->ratings);
        $this->page->averageRatings()->updateOrCreate($rating);
    }

    protected function getAverage($ratings): array
    {
        $count = count($ratings);
        $average_ratings = [
            'performance' => 0,
            'seo' => 0,
            'accessibility' => 0
        ];
        foreach ($ratings as $rating) {
            $average_ratings['performance'] += $rating->performance;
            $average_ratings['seo'] += $rating->seo;
            $average_ratings['accessibility'] += $rating->accessibility;
        }

        return [
            'performance' => round($average_ratings['performance'] / $count),
            'seo' => round($average_ratings['seo'] / $count),
            'accessibility' => round($average_ratings['accessibility'] / $count),
            'variant' => 'average'
        ];

    }

}
