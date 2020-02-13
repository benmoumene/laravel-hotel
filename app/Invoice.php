<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key'
    ];

    public function totalDue()
    {
        return $this->billedServices->sum('service.cost');
    }
    
    // SQL Original
    //SELECT tCustomers.id, tReservations.id, tInvoices.id
    //FROM customers AS tCustomers
    //INNER JOIN reservations tReservations ON tCustomers.id = tReservations.customer_id
    //INNER JOIN invoices tInvoices ON tInvoices.reservation_id = tReservations.id
    //WHERE tInvoices.reservation_id IN (58, 59)
    // ---------
    // SQL Eloquent
    //SELECT tCustomers.id, tReservations.id
    //FROM customers AS tCustomers
    //INNER JOIN reservations tReservations ON tCustomers.id = tReservations.customer_id
    //WHERE tReservations.id IN (58, 59)
    public function customer()
    {
        return $this->hasOneThrough(
            'App\Customer',
            'App\Reservation',
            'id', // ok
            'id', // ok
            'reservation_id',
            'customer_id' // ok
        );
    }

    public function billedServices()
    {
        return $this->hasManyThrough(
            'App\BilledService',
            'App\Reservation',
            'id', // reservations.id where
            'reservation_id', // reservation_id
            'reservation_id', // invoice_id where
            'id',
        );
    }
}
