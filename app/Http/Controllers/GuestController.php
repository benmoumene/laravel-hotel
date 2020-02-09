<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Guest;
use App\Reservation;

class GuestController extends Controller
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
        $guest = new Guest;
        $guest->first_name = $request['guest']['first_name'];
        $guest->last_name = $request['guest']['last_name'];
        $guest->address = $request['guest']['address'];
        $guest->phone = $request['guest']['phone'];
        $guest->sex = $request['guest']['sex'];
        $guest->nationality = $request['guest']['nationality'];
        $guest->document_id_type = $request['guest']['document_id_type'];
        $guest->document_id = $request['guest']['document_id'];
        $guest->save();

        return response()->json(['guest' => $guest], 200);
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
        $guest = Guest::where('id', $id)->first(); // firstOrFail???
        $guest->first_name = $request['guest']['first_name'];
        $guest->last_name = $request['guest']['last_name'];
        $guest->address = $request['guest']['address'];
        $guest->phone = $request['guest']['phone'];
        $guest->sex = $request['guest']['sex'];
        $guest->nationality = $request['guest']['nationality'];
        $guest->document_id_type = $request['guest']['document_id_type'];
        $guest->document_id = $request['guest']['document_id'];
        $guest->save();

        return response()->json(['guest' => $guest], 200);
    }

    public function checkIn(Request $request, $reservationId)
    {
        // Buscamos el guest en caso de que exista.
        $guest = Guest::firstOrCreate(['reservation_id' => intval($reservationId)]);
        $guest->check_in = date('Y-m-d H:i:s');
        
        if ($guest->check_out === null) {
            $guest->check_out = null;
        }
        $guest->save();

        return response()->json(['guest' => $guest], 200);
    }

    public function checkOut(Request $request, $reservationId)
    {
        // Buscamos el guest en caso de que exista.
        $guest = Guest::where('reservation_id', intval($reservationId))->first();
        $guest->check_out = date('Y-m-d H:i:s');
        $guest->save();
        // $service_container_reservation_expired!!!
        $reservation = Reservation::where('id', $reservationId)->first();
        $reservation->status = 'expired';
        $reservation->save();

        return response()->json(
            ['guest' => $guest,
            'reservation' => $reservation],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
