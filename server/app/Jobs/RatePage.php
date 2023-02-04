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
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Page;
use Throwable;

class RatePage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Page $page;

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
        $pages = Page::where('error', '=', '0')->orderBy('updated_at', 'ASC')
            ->get();
        error_log('Rating: '.$pages[0]->url);
        try {
            $page = PageService::rate($pages[0]);
            $this->page = $page;
            PageRated::dispatch($this->page);
        } catch (\Exception $e) {
            error_log('Catching Rate Page Error');
            $pages[0]->update(['error' => '1']);
        }
    }

    public function failed(Throwable $exception)
    {

    }
}
