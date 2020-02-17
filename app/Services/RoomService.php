<?php

namespace App\Services;

use App\Room;

class RoomService
{
    public function storeRoom($request)
    {
        // Creamos una nueva Room usando los datos recibidos
        $room = new Room($request->input("room"));
        
        // Guardamos los cambios
        $room->save();

        // Se devuelve el modelo Room, ya que todo fue bien.
        return $room;
    }

    // Metodo con la logica para actualizar Room
    public function updateRoom($request, $roomId)
    {
        // Buscamos la Room
        $room = Room::findOrFail($roomId);

        // La Room exista, asignamos nuevos valores mediante mass
        // assigment.
        $room->fill($request->input("room"));
        
        // Guardamos los cambios
        $room->save();

        // Se devuelve el modelo Room al haber guardado con exito.
        return $room;
    }
}
