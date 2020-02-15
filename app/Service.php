<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public $timestamps = false;

    public $fillable = [
        "name", "cost", "comments"
    ];
}
