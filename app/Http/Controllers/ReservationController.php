<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Reservation;

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
        $reservation->room_id = $request->input('reservation.room.id');
        $reservation->check_in = $request['reservation']['check_in'];
        $reservation->check_out = $request['reservation']['check_out'];
        $reservation->save();

        return response()->json(['reservation' => $reservation], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $reservation->check_in = $request['reservation']['check_in'];
        $reservation->check_out = $request['reservation']['check_out'];
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
