<?php

namespace App\Services;

use App\Invoice;

class InvoiceService
{
    private $error = "";

    public function getError()
    {
        return $this->error;
    }

    public function create($reservationId)
    {
        $invoice = new Invoice;
        $invoice->reservation_id = $reservationId;
        $invoice->save();
        return $invoice;
    }
}
