<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Room;
use App\Http\Requests\RoomRequest;
use App\Services\RoomService;

class RoomController extends Controller
{
    public function __construct(RoomService $roomService)
    {
        $this->middleware('auth');
        $this->roomService = $roomService;
    }

    // Metodo para gestionar los request de creacion (Room)
    public function store(RoomRequest $request)
    {
        // Utilizamos RoomService para la logica.
        $room = $this->roomService->storeRoom($request);
        return response()->json(['room' => $room], 200);
    }

    // Metodo para gestionar los request de actualizacion (Room)
    public function update(RoomRequest $request, $roomId)
    {
        // Utilizamos RoomService para la logica.
        $room = $this->roomService->updateRoom($request, $roomId);

        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['room' => $room], 200);
    }

    public function destroy($id)
    {
        // Pendiente de implementar
        // Requerir role admin, los recepcionistas no pueden borrar
    }
}
