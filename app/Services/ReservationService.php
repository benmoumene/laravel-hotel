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
        // Creamos la reserva
        $reservation = $this->createReservation(
            $request->input('reservation.customer.id'),
            $request->input('reservation.room.id'),
            $request->input('reservation.from_date'),
            $request->input('reservation.to_date')
        );

        if (!$reservation) {
            return [
                "error" => "The reservation cannot be registered."
            ];
        }

        // Creamos el guest asociado a la reserva
        $guest = new Guest(["reservation_id" => $reservation->id]);

        // Si no se puede registrar el huespued ...
        if (!$guest->save()) {
            $reservation->delete();
            $reservation->save();
            return false;
        }

        $invoice = new Invoice(["reservation_id" => $reservation->id]);
        if (!$invoice->save()) {
            $guest->delete();
            $guest->save();
            $reservation->delete();
            $reservation->save();
            return false;
        }

        // Usar modelos para obtener la info ...
        // $guest->with(['customer:id', 'room:id'])
        $guest['customer'] = ['id' => $guest->customer()->first()->id];
        $guest['room'] = ['id' => $guest->room()->first()->id];
        $reservation['guest'] = ['id' => $guest->id];
        $reservation['invoice'] = ['id' => $invoice->id];
        $response = ['guest' => $guest,
            'reservation' => $reservation,
            'invoice' => $invoice
        ];

        return $response;
    }

    public function checkForExpiredReservations()
    {
    }

    private function createReservation($customerId, $roomId, $from, $to)
    {
        // Comprobamos que efectivamente podemos realizar
        // una reserva durante la fecha indicada.
        if (!$this->validateDate($from, $to, $roomId)) {
            return false;
        }

        // En el caso de que sea posible crear la reserva
        // de la habitacion en las fechas indicadas, procedemos
        // a insertar la reserva en la BD
        $reservation = new Reservation;
        $reservation->customer_id = $customerId;
        $reservation->status = 'active';
        $reservation->room_id = $roomId;
        $reservation->from_date = $from;
        $reservation->to_date = $to;

        // Si no se consigue guardar la reserva en la BD
        $reservation->save();

        // Reserva creada con exito.
        return $reservation;
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
}
