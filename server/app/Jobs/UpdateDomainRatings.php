<?php

namespace App\Jobs;

use App\Events\DomainRatingsUpdated;
use App\Models\Domain;
use App\Models\Page;
use App\Models\Rating;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateDomainRatings implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public Domain $domain;
    public Rating $domain_rating;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Domain $domain)
    {
        $this->domain = $domain;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $pages = $this->domain->pages->where('error', '=', '0');
            $ratings = $this->getAverageRatings($pages);
            $this->setDomainRatings($ratings);
            DomainRatingsUpdated::dispatch($this->domain);

        } catch (\Exception $e) {
            error_log('Updating Domain Ratings failed for '.$this->domain->name);
            error_log($e);
        }

    }

    protected function setDomainRatings($ratings): void
    {
        try {
            error_log('Setting Domain Ratings for: '.$this->domain->name);
            if ($this->domain->rating !== null) {
                $this->domain->rating->update($ratings);
            } else {
                $this->domain->rating()->create($ratings);
            }
            $this->domain_rating = $this->domain->rating;
        } catch (\Exception $e) {
            error_log('Setting Ratings Failed');
            error_log($e);
        }

    }

    /**
     * @param  Page[]  $pages
     */
    protected function getAverageRatings($pages)
    {
        $seo = 0;
        $performance = 0;
        $accessibility = 0;
        $count = count($pages);

        if ($count === 0) {
            throw new \Exception('No Pages');
        }


        foreach ($pages as $page) {
            if ($page->averageRatings === null) {
                $count--;
                continue;
            }
            $seo += $page->averageRatings->seo;
            $performance += $page->averageRatings->performance;
            $accessibility += $page->averageRatings->accessibility;

        }
        error_log('Numbers: S: '.$seo.', P: '.$performance.', A: '.$accessibility);
        error_log('Divided Numbers: S: '.$seo / $count.',P: '.$performance /
            $count.',A: '.$accessibility / $count);
        error_log('Rounded Numbers: S: '.round($seo / $count).', P: '.round
            ($performance / $count).', A: '.round($accessibility / $count));


        return [
            'seo' => round($seo / $count),
            'performance' => round($performance / $count),
            'accessibility' => round($accessibility / $count),
        ];
    }

}
