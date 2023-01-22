<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    use HasFactory;


    protected $with = ['rating'];
    protected $withCount = ['pages'];
    protected $fillable = ['name', 'favicon', 'sitemap', 'sitemapFound', 'url'];

    public function pages()
    {
        return $this->hasMany(Page::class)->orderBy('updated_at', 'DESC');
    }

    public function rating()
    {
        return $this->morphOne(Rating::class, 'ratable');
    }


}
