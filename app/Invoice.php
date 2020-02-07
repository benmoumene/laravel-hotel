<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key'
    ];

    public function total()
    {
        // Select SUM billed_services where guest_id = id
    }

    public function customer()
    {
        return $this->hasOneThrough(
            'App\Customer',
            'App\Reservation',
            'id',
            'id',
            'id',
            'customer_id'
        );
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
