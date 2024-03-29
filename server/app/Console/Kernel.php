<?php

namespace App\Console;

use App\Jobs\CheckSitemaps;
use App\Jobs\RatePage;
use App\Jobs\UpdateAllDomainRatings;
use App\Jobs\UpdateDomainRatings;
use App\Models\Domain;
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
        $schedule->job(new UpdateAllDomainRatings)->everyFifteenMinutes();
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
