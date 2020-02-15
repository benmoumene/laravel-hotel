<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        "name", "size", "type", "floor"
    ];
}
