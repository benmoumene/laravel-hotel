<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\GuestRequest;
use App\Guest;
use App\Reservation;

class GuestController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }

    // Metodo para registrar la llegada del Huesped al hotel
    public function checkIn(GuestRequest $request, $guestId)
    {
        // Buscamos el huesped
        $guest = Guest::where('id', $guestId)->first();
        // Asignamos la fecha actual como la entrada
        $guest->check_in = date('Y-m-d H:i:s');
        // Guardamos los cambios
        $guest->save();
        return response()->json(['guest' => $guest], 200);
    }

    // Metodo para registrar la salida del Huesped del hotel
    public function checkOut(GuestRequest $request, $guestId)
    {
        // Buscamos el huesped
        $guest = Guest::where('id', $guestId)->first();
        // Asignamos la fecha actual como la salida
        $guest->check_out = date('Y-m-d H:i:s');
        // Guardamos los cambios
        $guest->save();

        // $service_container_reservation_expired!!!
        $reservation = Reservation::where('id', $guest->reservation_id)->first();
        $reservation->status = 'expired';
        $reservation->save();

        return response()->json(
            ['guest' => $guest,
            'reservation' => $reservation],
            200
        );
    }
}
