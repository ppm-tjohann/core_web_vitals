<?php

namespace App\Jobs;

use App\Events\PageRated;
use App\Models\Rating;
use App\Services\PageService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Page;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Throwable;

class RatePage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private string $key;
    public Page $page;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->key = env('GOOGLE_CWV_KEY');
        $this->page = $this->getRatingPage();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (!$this->page) {
            return;
        }

        error_log('Rating: '.$this->page->url);
        try {
            $rating = $this->getRating();
            $this->setRating($rating);
            PageRated::dispatch($rating);
        } catch (\Exception $e) {
            $this->page->update(['error' => '1']);
        }
    }

    public function failed(Throwable $exception)
    {

    }

    protected function getRatingPage(): Page|bool
    {
        $pages = Page::doesntHave('ratings')
            ->where('error', '=', '0')
            ->get();

        if (count($pages) === 0) {
            $pages = Page::where('error', '=', '0')
                ->whereHas('ratings', function (Builder $query) {
                    $query->where('created_at', '<=', Carbon::today());
                })
                ->orderBy('updated_at', 'ASC')
                ->get();
        }
        if (count($pages) === 0) {
            error_log('No Pages Left');
            return false;
        }
        return $pages[0];
    }

    protected function getRating(): Rating
    {

        $url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='.$this->page->url.'&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO&strategy=MOBILE&key='.$this->key;
        $response = Http::get($url);
        $json = $response->json();
        $ratings = $json['lighthouseResult']['categories'];

        return new Rating([
            'seo' => $ratings['seo']['score'] * 100,
            'performance' => $ratings['performance']['score'] * 100,
            'accessibility' => $ratings['accessibility']['score'] * 100,
            'variant' => 'rating',
        ]);
    }

    protected function setRating(Rating $rating): Rating
    {
        $this->page->loadCount('ratings');
        $ratings_count = $this->page->ratings_count;
        if ($ratings_count > 10) {
            //Delete older Ratings
            $ratings = $this->page->load('ratings')->ratings;
            for ($i = 9; $i < count($ratings); $i++) {
                $ratings[$i]->delete();
            }
        }
        $this->page->ratings()->save($rating);
        $this->page->touch();
        return $rating;
    }

}
