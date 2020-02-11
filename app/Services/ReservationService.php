<?php

namespace App\Services;

use App\Reservation;

class ReservationService
{
    private $error = "";

    public function getError()
    {
        return $this->error;
    }
    
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
            $this->error = "The final date cannot be lesser than the start date.";
            return false;
        }

        $reservations = Reservation::
        whereBetween('from_date', [$from, $to])
        ->whereBetween('to_date', [$from, $to])
        ->where('status', '=', 'active')
        ->where('room_id', '=', $roomId)
        ->count();

        if ($reservations >= 1) {
            $this->error = "This room is already used between these dates.";
            return false;
        }

        return true;
    }

    public function create($customerId, $roomId, $from, $to)
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
        if (!$reservation->save()) {
            $this->error = "SQL Error.";
            return false;
        }

        // Reserva creada con exito.
        return $reservation;
    }

    // Metodo para cancelar una resevaa
    public function cancel($reservationId)
    {
        // Buscamos la reserva a cancelar
        $reservation = Reservation::where('id', $reservationId)->firstOrFail();
        $reservation->status = 'cancelled';

        // Guardamos los cambios y en caso de fallo agregamos un error
        if (!$reservation->save()) {
            $this->error = "Reservation cannot be cancelled.";
            return false;
        }

        // Reserva cancelada
        return $reservation;
    }
}
