<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Reservation;
use App\Guest;

class ReservationController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentUserId = Auth::user()->id;
        $reservation = new Reservation;
        $reservation->customer_id = $request->input('reservation.customer.id');
        $reservation->status = 'active';
        $reservation->room_id = $request->input('reservation.room.id');
        $reservation->from_date = $request['reservation']['from_date'];
        $reservation->to_date = $request['reservation']['to_date'];
        $reservation->save();

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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $currentUserId = Auth::user()->id;
        $reservation = Reservation::where('id', $id)->first(); // firstOrFail???
        $reservation->from_date = $request['reservation']['from_date'];
        $reservation->to_date = $request['reservation']['to_date'];
        $reservation->save();

        return response()->json(['reservation' => $reservation], 200);
    }

    public function cancel(Request $request, $id)
    {
        $reservation = Reservation::where('id', $id)->first(); // firstOrFail???
        $reservation->status = 'cancelled';
        $reservation->save();
        return response()->json(['reservation' => $reservation], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $currentUserId = Auth::user()->id;
        $reservation = Reservation::where('id', $id)->first(); // firstOrFail???
        $reservation->delete();

        return response()->json(['reservation' => $reservation], 204);
    }
}
