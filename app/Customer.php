<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $timestamps = false;

    protected $hidden = [
        'laravel_through_key', "created_at", "updated_at"
    ];

    protected $fillable = [
        "first_name", "last_name", "sex", "address",
        "phone", "nationality", "document_id_type", "document_id"
    ];

    public function invoices()
    {
        return $this->hasManyThrough(
            'App\Invoice',
            'App\Reservation'
        );
        //)->select("invoices.id");
    }

    public function reservations()
    {
        return $this->hasManyThrough(
            'App\Reservation',
            'App\Customer',
            'id',
            'customer_id',
            'id',
            'id'
        );
    }
}
