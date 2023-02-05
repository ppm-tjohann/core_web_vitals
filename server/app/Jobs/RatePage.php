<?php

namespace App\Jobs;

use App\Events\PageRated;
use App\Models\Rating;
use App\Services\PageService;
use Illuminate\Broadcasting\Channel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Page;
use Illuminate\Support\Carbon;
use Throwable;

class RatePage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $page = $this->getRatingPage();

        if (!$page) {
            error_log('All Pages rated today');
            return;
        }

        error_log('Rating: '.$page->url);
        try {
            $rating = PageService::rate($page);
            PageRated::dispatch($rating);
        } catch (\Exception $e) {
            error_log('Catching Rate Page Error');
            $page->update(['error' => '1']);
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
                ->andWhereHas('ratings', function (Builder $query) {
                    $query->where('created_at', '<=', Carbon::today());
                })
                ->orderBy('updated_at', 'ASC')
                ->get();
        }
        if (count($pages) === 0) {
            return false;
        }
        return $pages[0];
    }

}
