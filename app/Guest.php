<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    public $timestamps = false;
    protected $table = "guests";

    // Conversaciones en las que participa el usuario
    public function reservations()
    {
        return $this->hasMany(
            'App\Reservation'
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
