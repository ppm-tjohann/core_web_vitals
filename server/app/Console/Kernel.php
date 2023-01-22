<?php

namespace App\Console;

use App\Jobs\CheckSitemaps;
use App\Jobs\DefaultRatings;
use App\Jobs\RatePage;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new RatePage)->everyMinute();
        $schedule->job(new DefaultRatings)->everyMinute();
        $schedule->job(new CheckSitemaps)->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
