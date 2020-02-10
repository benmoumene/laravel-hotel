<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\ReservationRequest;
use App\Reservation;
use App\Guest;
use App\Services\ReservationService;

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
        //$rs = new ReservationService
        //$reservation = new Reservation;
        //$rs->registerReservation($reservation);
        //$guest = new Guest;
        //$rs->registerGuest($guest);
        //$rs->registerInvoice;
        //$rs->registerBilledServices
        //if($rs->sucess)
        //return response()->json([
        //    'reservation' => $reservation,
        //    'guest' => $guest
        //], 200);
        //else
        //return response()->json('Reservation cannot be handle', 501);

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

        $guest['customer'] = ['id' => $guest->customer()->first()->id];
        $guest['room'] = ['id' => $guest->room()->first()->id];
        $reservation['guest'] = ['id' => $guest->id];
        $response = ['guest' => $guest , 'reservation' => $reservation];
        return response()->json($response, 200);
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
