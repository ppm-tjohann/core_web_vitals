<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDomainRequest;
use App\Http\Requests\UpdateDomainRequest;
use App\Services\DomainService;
use App\Models\Domain;
use App\Services\RateService;
use Spatie\QueryBuilder\QueryBuilder;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $domains = QueryBuilder::for(Domain::Class)
            ->allowedFields(['id', 'name'])
            ->allowedIncludes(['pages', 'pages.ratings', 'ratings'])
            ->get();
        return response($domains);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CreateDomainRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateDomainRequest $request)
    {
        $domain = Domain::create($request->all());
        return response($domain, 201);
    }

    public function sitemap(Domain $domain)
    {
        DomainService::updateOrCreateSitemap($domain);
    }

    public function average()
    {
        $domains = Domain::with('pages', 'rating', 'pages.averageRatings')
            ->get();


        foreach ($domains as $domain) {
            if ($domain->rating === null) {
                $domain_rating = RateService::createInitialRating();
                $domain->rating()->save($domain_rating);
                continue;
            }

            $page_ratings = [];
            foreach ($domain->pages as $page) {
                $page_ratings[] = $page->averageRatings;
            }

            RateService::getDefaultRatings($domain->rating, $page_ratings);

        }
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $domain = QueryBuilder::for(Domain::Class)
            ->allowedFields(['id', 'name'])
            ->allowedIncludes(['pages', 'pages.ratings', 'ratings'])
            ->where('id', $id)
            ->firstOrFail();
        return response($domain);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateDomainRequest  $request
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDomainRequest $request, Domain $domain)
    {
        $domain->update($request->all());
        return response($domain, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Domain  $domain
     * @return \Illuminate\Http\Response
     */
    public function destroy(Domain $domain)
    {
        $domain->delete();
        return response(['message' => 'Record deleted'], 200);
    }
}
