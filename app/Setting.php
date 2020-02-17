<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "value", "description"
    ];

    // Retorna todos los ids [1, 7, 5, 9 ...]
    public function scopeFetchIds()
    {
        return $this->pluck("id");
    }
}
