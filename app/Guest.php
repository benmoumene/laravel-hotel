<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    public $timestamps = false;
    protected $table = "guests";

    protected $hidden = [
        'laravel_through_key'
    ];

    // Guest es un cliente
    public function customer()
    {
        return $this->hasOneThrough(
            'App\Customer',
            'App\Reservation',
            //'customer_id',
            //'id',
            //'id',
            //'customer_id',
            'id',
            'id',
            'reservation_id',
            'customer_id',
        );
    }

    // Reservas de este huesped
    public function reservation()
    {
        return $this->hasOne(
            'App\Reservation',
            'customer_id'
        );
    }

    // Habitacion en la que se hospeada
    public function room()
    {
        return $this->hasOneThrough(
            'App\Room',
            'App\Reservation',
            'id',
            'id',
            'reservation_id',
            'room_id',
        );
    }
}
