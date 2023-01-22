<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Page extends Model
{
    use HasFactory;

    protected $with = ['averageRatings'];
    protected $touches = ['domain'];
    public $timestamps = true;
    protected $fillable = ['url', 'domain_id', 'error'];

    //default order
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('updated_at', 'DESC');
        });
    }


    public
    function domain()
    {
        return $this->belongsTo(Domain::class);
    }

    public
    function averageRatings()
    {
        return $this->morphOne(Rating::class, 'ratable');
    }

    public
    function ratings()
    {
        return $this->morphMany(Rating::class, 'ratable')->orderBy('created_at',
            'DESC');
    }
}
