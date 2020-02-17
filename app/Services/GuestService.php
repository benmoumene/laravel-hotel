<?php

namespace App\Services;

use App\Guest;
use App\Invoice;
use App\Reservation;

use App\Services\ReservationService;
use App\Services\InvoiceService;

class GuestService
{
    public function checkIn($request, $guestId)
    {
        // Buscamos el huesped
        $guest = Guest::findOrFail($guestId);

        // Guardamos y en caso de error, retornamos false
        $guest->checkIn();

        return $guest;
    }

    public function checkOut($request, $guestId)
    {
        // Buscamos el huesped
        $guest = Guest::findOrFail($guestId);

        // El metodo checkOut establece y guarda los cambios
        $guest->checkOut();

        $reservation = Reservation::findOrFail($guest->reservation_id);
        $reservation->expire();

        $invoice = Invoice::where('reservation_id', $guest->reservation_id)->firstOrFail();
        $invoice->generate();

        return [
            "guest" => $guest,
            'reservation' => $reservation,
            'invoice' => $invoice
        ];
    }
}
