<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key'
    ];

    public function totalDue()
    {
        return $this->billedServices->sum('service.cost');
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
        return $this->hasManyThrough(
            'App\BilledService',
            'App\Reservation',
            'id', // reservations.id where
            'reservation_id', // reservation_id
            'reservation_id', // invoice_id where
            'id',
        );
    }
}
