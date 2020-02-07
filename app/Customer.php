<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $timestamps = false;
    protected $table = "customers";

    protected $hidden = [
        'laravel_through_key'
    ];

    public function invoices()
    {
        return $this->hasManyThrough(
            'App\Invoice',
            'App\Reservation'
        );
    }

    public function reservations()
    {
        return $this->hasManyThrough(
            'App\Reservation',
            'App\Customer',
            'id',
            'customer_id',
            'id',
            'id'
        );
    }
}
