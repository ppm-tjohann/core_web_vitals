<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JsonRequest extends FormRequest
{
    public function expectsJson(): bool
    {
        return true;
    }

    public function wantsJson(): bool
    {
        return true;
    }
}
