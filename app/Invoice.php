<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key'
    ];

    protected $fillable = [
        'reservation_id', "status", "payment_method"
    ];

    // Genera la factura
    public function generate()
    {
        $this->status = "pending";
        $this->total = $this->totalDue();
        $this->generated_on = date("Y-m-d h:i:s");
        $this->save();
    }

    public function totalDue()
    {
        $invoice = Invoice::find($this->id);
        return $invoice->billedServices->sum('service.cost');
    }
    
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
