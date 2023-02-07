<?php

namespace App\Jobs;

use App\Events\DomainRatingsUpdated;
use App\Models\Domain;
use App\Models\Page;
use App\Models\Rating;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
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
        $pages = $this->domain->pages()
            ->where('error', '=', '0')
            ->whereHas('averageRatings')
            ->get();

        if (count($pages) === 0) {
            error_log('No Ratings for: '.$this->domain->name);
            return;
        }
        $ratings = $this->getAverageRatings($pages);
        $this->setDomainRatings($ratings);
        DomainRatingsUpdated::dispatch($this->domain);
    }

    protected function setDomainRatings($ratings): void
    {
        $this->domain->rating()->updateOrCreate(
            ['ratable_id' => $this->domain->id], $ratings);
        $this->domain_rating = $this->domain->rating;
    }

    protected function getAverageRatings($pages)
    {
        $seo = 0;
        $performance = 0;
        $accessibility = 0;
        $count = count($pages);

        foreach ($pages as $page) {
            $seo += $page->averageRatings->seo;
            $performance += $page->averageRatings->performance;
            $accessibility += $page->averageRatings->accessibility;
        }

        return [
            'seo' => round($seo / $count),
            'performance' => round($performance / $count),
            'accessibility' => round($accessibility / $count),
        ];
    }

}
