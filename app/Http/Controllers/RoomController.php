<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Room;
use App\Http\Requests\RoomRequest;

class RoomController extends Controller
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
    public function store(RoomRequest $request)
    {
        $currentUserId = Auth::user()->id;
        $room = new Room;
        $room->name = $request['room']['name'];
        $room->type = $request['room']['type'];
        $room->floor = $request['room']['floor'];
        $room->save();

        $room['reservations'] = array();
        return response()->json(['room' => $room], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoomRequest $request, $roomId)
    {
        // ID del usuario logeado en la app
        $currentUserId = Auth::user()->id;
        $room = Room::where('id', $roomId)->first();
        $room->name = $request['room']['name'];
        $room->type = $request['room']['type'];
        $room->floor = $request['room']['floor'];
        $room->save();
                
        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['room' => $room], 200);
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
