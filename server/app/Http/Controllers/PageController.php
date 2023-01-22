<?php

namespace App\Http\Controllers;

use App\Http\Requests\PageRequest;
use App\Models\Domain;
use App\Models\Page;
use App\Models\Rating;
use App\Services\PageService;
use App\Services\RateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Page::with('ratings', 'averageRatings')->get();
        return response($pages);
    }

    public function average(Page $page)
    {
        error_log($page->url);
        $page->load(['ratings', 'averageRatings']);

        RateService::getDefaultRatings($page->averageRatings, $page->ratings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PageRequest $request)
    {
        $page = Page::create(['url' => $request->url]);
        return response($page, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return response($page);
    }

    public function showDomain(Domain $domain)
    {
        $domain->load('pages');
        $pages = $domain->pages;
        return response($pages);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PageRequest  $request
     * @param  Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(PageRequest $request, Page $page)
    {
        $page->url = $request->url;
        $page->save();
        return response($page);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();
        return response(['message' => 'Recorded deleted'], 200);
    }


    public function rate(Page $page)
    {
        error_log('Rating Controller');
        $page = PageService::rate($page);
        return response($page, 201);
    }

}