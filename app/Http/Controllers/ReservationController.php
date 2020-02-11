<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\ReservationRequest;
use App\Reservation;
use App\Guest;
use App\Services\ReservationService;
use App\Services\GuestService;

class ReservationController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }
    
    // Metodo para crear reservas
    public function store(ReservationRequest $request)
    {
        // Servicios
        $rs = new ReservationService;
        $gs = new GuestService;

        // Creamos la reserva
        $reservation = $rs->create(
            $request->input('reservation.customer.id'),
            $request->input('reservation.room.id'),
            $request->input('reservation.from_date'),
            $request->input('reservation.to_date')
        );

        // Si no se puede hacer la reserva ...
        if (!$reservation) {
            return response()->json(['message' =>
                $rs->getError()], 500);
        }

        // Creamos el guest asociado a la reserva
        $guest = $gs->create($reservation);

        // Si no se puede registrar el huespued ...
        if (!$guest) {
            $reservation->delete();
            $reservation->save();
            return response()->json(['message' =>
                $gs->getError()], 500);
        }

        $guest['customer'] = ['id' => $guest->customer()->first()->id];
        $guest['room'] = ['id' => $guest->room()->first()->id];
        $reservation['guest'] = ['id' => $guest->id];
        $response = ['guest' => $guest , 'reservation' => $reservation];
        return response()->json($response, 200);
    }

    // Metodo para cancelar reservas
    public function cancel(Request $request, $reservationId)
    {
        // Servicios
        $rs = new ReservationService;
        $reservation = $rs->cancel($reservationId);

        // En caso de fallo enviamos un error al cliente
        if (!$reservation) {
            return response()->json(['message' =>
                $rs->getError()], 500);
        }

        return response()->json(['reservation' => $reservation], 200);
    }
}
