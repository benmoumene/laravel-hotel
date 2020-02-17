<?php

namespace App\Services;

use App\Reservation;
use App\Guest;
use App\Invoice;

class ReservationService
{
    // Este metodo comprueba que se puede reservar una habitacion
    // en las fecha indicada. De esta forma evitamos que se realizen
    // varias reservas en periodos de tiempo en los que una habitacion
    // esta usada por otro cliente.
    public function validateDate($from, $to, $roomId)
    {
        // Primero comprobamos las fechas introducidas
        // La fecha inicial ($from) debe ser menor o igual a la final.
        // Por lo que si $from > $to debemos retornar el error.
        if ($from > $to) {
            //$this->error = "The final date cannot be lesser than the start date.";
            return false;
        }

        $reservations = Reservation::
        whereBetween('from_date', [$from, $to])
        ->whereBetween('to_date', [$from, $to])
        ->where('status', '=', 'active')
        ->where('room_id', '=', $roomId)
        ->count();

        if ($reservations >= 1) {
            //$this->error = "This room is already used between these dates.";
            return false;
        }

        return true;
    }

    public function storeReservation($request)
    {
        $customerId = $request->input('reservation.customer.id');
        $roomId = $request->input('reservation.room.id');
        $from = $request->input('reservation.from_date');
        $to = $request->input('reservation.to_date');

        // Comprobamos que efectivamente podemos realizar
        // una reserva durante la fecha indicada.
        if (!$this->validateDate($from, $to, $roomId)) {
            return false;
        }

        try {
            \DB::beginTransaction();
            
            // Creamos la reserva
            $reservation = new Reservation(
                [
                    "customer_id" => $customerId,
                    "room_id" => $roomId,
                    "from_date" => $from,
                    "to_date" => $to,
                    "status" => "active"
                ]
            );

            $reservation->save();

            // Creamos el guest asociado a la reserva
            $guest = new Guest(["reservation_id" => $reservation->id]);
            $guest->save();

            // Creamos la factura de la reserva
            $invoice = new Invoice(["reservation_id" => $reservation->id]);
            $invoice->save();
            
            // Realizar cambios
            \DB::commit();
        } catch (\Exception $e) {
            // Si ocurre algun problema se borrara cualquier
            // cambio realizado en la DB
            \DB::rollback();
            return false;
        }

        return [
            'reservation' => $reservation,
            'invoice' => $invoice,
            'guest' => $guest,
        ];
    }

    // Metodo para cancelar una resevaa
    public function cancelReservation($request, $reservationId)
    {
        // Buscamos la reserva a cancelar
        $reservation = Reservation::findOrFail($reservationId);

        // Guardamos los cambios y en caso de fallo agregamos un error
        $reservation->cancel();

        // Reserva cancelada
        return $reservation;
    }

    public function checkForExpiredReservations()
    {
    }
}
