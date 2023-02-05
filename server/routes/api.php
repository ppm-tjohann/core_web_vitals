<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\RatingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('domain', DomainController::class);
Route::get('domain/{domain}/sitemap', [DomainController::class, 'sitemap']);
Route::get('domain/{domain}/average', [DomainController::class, 'average']);


Route::apiResource('pages', PageController::class);
Route::get('pages/{page}/average', [PageController::class, 'average']);


Route::get('pages/domain/{domain}', [PageController::class, 'showDomain']);
Route::get('pages/rate/{page}', [PageController::class, 'rate']);


Route::group(['prefix' => 'ratings'], function () {
    Route::get('', [RatingController::class, 'index']);
    Route::get('today', [RatingController::class, 'today']);
    Route::get('pages', [RatingController::class, 'pages']);
});

