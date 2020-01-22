<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $timestamps = false;

    public function total()
    {
        // Select SUM billed_services where guest_id = id
    }

    public function guest()
    {
        return $this->belongsTo(
            'App\Guest'
        );
    }

    public function customer()
    {
    }

    public function billedServices()
    {
        return $this->hasMany(
            'App\BilledService',
            'guest_id',
            'id'
        );
    }
}
