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

    protected $fillable = [
        "reservation_id", "check_in", "check_out"
    ];

    public function checkIn()
    {
        // Asignamos la fecha actual como la entrada
        $this->check_in = date('Y-m-d H:i:s');
        return $this->save();
    }

    public function checkOut()
    {
        // Asignamos la fecha actual como la salida
        $this->check_out = date('Y-m-d H:i:s');
        return $this->save();
    }

    // Guest es un cliente
    public function customer()
    {
        return $this->hasOneThrough(
            'App\Customer',
            'App\Reservation',
            'id',
            'id',
            'reservation_id',
            'customer_id',
        );
    }

    // Reserva de este huesped
    public function reservation()
    {
        return $this->belongsTo(
            'App\Reservation'
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
