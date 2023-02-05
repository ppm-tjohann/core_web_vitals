<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Spatie\QueryBuilder\QueryBuilder;

class RatingController extends Controller
{
    public function index(): Response
    {
        $ratings = Rating::all();
        return response($ratings);
    }

    public function pages()
    {
        $ratings = Rating::where('ratable_type', 'App\\Models\\Page')
            ->with(['ratable', 'ratable.domain'])
            ->get();
        return response($ratings);
    }

    public function today(): Response
    {
        $ratings = Rating::where('created_at', '>=', Carbon::today())->get();
        return response($ratings);
    }

}
