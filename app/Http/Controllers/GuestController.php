<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\GuestRequest;
use App\Guest;
use App\Reservation;
use App\Invoice;
use App\Services\GuestService;

class GuestController extends Controller
{
    public function __construct(GuestService $guestService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->guestService = $guestService;
    }

    // Metodo para registrar la llegada del Huesped al hotel
    public function checkIn(GuestRequest $request, $guestId)
    {
        $guest = $this->guestService->checkIn($request, $guestId);
        
        if (!$guest) {
            return response()->json([
                "error" => "Something went wrong during checkin."], 500);
        }

        return response()->json(["guest" => $guest], 200);
    }

    // Metodo para registrar la salida del Huesped del hotel
    public function checkOut(GuestRequest $request, $guestId)
    {
        $guest = $this->guestService->checkOut(
            $request,
            $guestId,
        );

        if (!$guest) {
            return response()->json([
                "error" => "Something went wrong during checkout."], 500);
        }

        return response()->json($guest, 200);
    }
}
