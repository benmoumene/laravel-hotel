<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    public $timestamps = false;

    public function customer()
    {
        return $this->belongsTo(
            'App\Customer'
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
