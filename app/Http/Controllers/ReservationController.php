<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\ReservationRequest;
use App\Reservation;
use App\Guest;

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
        // Creamos la reserva
        $reservation = new Reservation;
        $reservation->customer_id = $request->input('reservation.customer.id');
        $reservation->status = 'active';
        $reservation->room_id = $request->input('reservation.room.id');
        $reservation->from_date = $request->input('reservation.from_date');
        $reservation->to_date = $request->input('reservation.to_date');
        $reservation->save();

        // Creamos el guest asociado a la reserva
        $guest = new Guest;
        $guest->reservation_id = $reservation->id;
        $guest->check_in = null;
        $guest->check_out = null;
        $guest->save();

        $reservation['guest']['id'] = $guest->id;
        return response()->json([
            'reservation' => $reservation,
            'guest' => $guest
        ], 200);
    }

    // Metodo para cancelar reservas
    public function cancel(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)->first();
        $reservation->status = 'cancelled';
        $reservation->save();
        return response()->json(['reservation' => $reservation], 200);
    }
}
