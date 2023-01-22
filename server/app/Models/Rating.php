<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $touches = ['ratable'];
    protected $fillable = ['seo', 'performance', 'accessibility'];

    public function ratable()
    {
        return $this->morphTo();
    }

}
