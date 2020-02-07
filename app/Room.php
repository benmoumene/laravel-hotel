<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public $timestamps = false;
    protected $table = "rooms";

    protected $hidden = [
        'laravel_through_key'
    ];

    // Guests hospeados actualmente en la habitacion
    public function guest()
    {
        return $this->hasOne(
            'App\Guest'
        );
    }

    // Reservas para esta habitacion
    public function reservations()
    {
        return $this->hasMany(
            'App\Reservation'
        );
    }
}
