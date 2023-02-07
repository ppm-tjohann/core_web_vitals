<?php

namespace App\Models;

use App\Models\Scopes\OrderScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $touches = ['ratable'];
    protected $fillable = ['seo', 'performance', 'accessibility', 'variant'];

    protected static function boot()
    {
        parent::boot();
        self::addGlobalScope(new OrderScope());
    }


    public function ratable()
    {
        return $this->morphTo();
    }

}
