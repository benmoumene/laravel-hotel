<?php

namespace App\Services;

use App\Guest;

class GuestService
{
    private $error = "";

    public function getError()
    {
        return $this->error;
    }
    
    // create reservation
    public function reservation(App\Reservation $reservation)
    {
        // Comprobaciones

        // return true/false
    }

    private function validReservation($from, $to)
    {
        // SELECT RESERVATIONS WHERE $from > now && $to
    }

    public function checkOut()
    {
        // Comprobaciones ...
    }

    public function create($reservation)
    {
        // Creamos el guest asociado a la reserva
        $guest = new Guest;
        $guest->reservation_id = $reservation->id;
        $guest->check_in = null;
        $guest->check_out = null;
        $guest->save();

        return $guest;
    }
}
