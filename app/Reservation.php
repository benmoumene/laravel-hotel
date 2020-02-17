<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    public $timestamps = false;
    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        "customer_id", "room_id", "from_date", "to_date", "status"
    ];

    public function expire()
    {
        $this->status = "expired";
        return $this->save();
    }

    public function cancel()
    {
        $this->status = "cancelled";
        return $this->save();
    }

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
