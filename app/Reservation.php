<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    public $timestamps = false;
    protected $hidden = [
        'laravel_through_key'
    ];

    public function customer()
    {
        return $this->belongsTo(
            'App\Customer'
        );
    }

    public function guest()
    {
        return $this->hasOneThrough(
            'App\Guest',
            'App\Reservation',
            'id',
            'reservation_id',
            'id',
            'id'
        );
    }

    public function room()
    {
        return $this->hasOne(
            'App\Room',
            'id',
            'room_id'
        );
    }
}
