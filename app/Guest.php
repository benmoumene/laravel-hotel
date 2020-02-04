<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    public $timestamps = false;
    protected $table = "guests";

    // Guest es un cliente
    public function customer()
    {
        return $this->belongsTo(
            'App\Customer'
        );
    }

    // Servicios facturados a este huesped
    public function billedServices()
    {
        return $this->hasMany(
            'App\BilledService',
            'guest_id',
            'id'
        );
    }

    // Reservas de este huesped
    public function reservation()
    {
        return $this->hasOne(
            'App\Reservation',
            'id',
            'reservation_id'
        );
    }

    // Habitacion en la que se hospeada
    public function room()
    {
        return $this->hasOneThrough(
            'App\Reservation',
            'App\Room',
            'id',
            'room_id',
        );
    }

    public function invoices()
    {
        return $this->hasMany(
            'App\Reservation'
        );
    }

    public function dueInvoices()
    {
        return $this->hasMany(
            'App\Reservation'
        );
    }
}
