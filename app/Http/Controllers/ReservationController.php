<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\ReservationStoreRequest;
use App\Reservation;
use App\Guest;
use App\Services\ReservationService;

class ReservationController extends Controller
{
    public function __construct(ReservationService $reservationService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->reservationService = $reservationService;
    }
    
    // Metodo para crear reservas
    public function store(ReservationStoreRequest $request)
    {
        $reservation = $this->reservationService->storeReservation(
            $request
        );

        if (!$reservation) {
            return response()->json(
                ["error" => "The reservation cannot be registered."],
                500
            );
        }

        return response()->json($reservation, 200);
    }

    

    public function cancel(Request $request, $reservationId)
    {
        $reservation = $this->reservationService->cancelReservation(
            $request,
            $reservationId
        );

        // En caso de fallo enviamos un error al cliente
        if (!$reservation) {
            return response()->json(
                ["error" => "The reservation cannot be updated."],
                500
            );
        }

        return response()->json(['reservation' => $reservation], 200);
    }
}
