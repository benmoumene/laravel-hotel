<?php

namespace App\Services;

use App\Invoice;

class InvoiceService
{
    public function storeInvoice($request)
    {
        $invoice = new Invoice($request->input("invoice"));
        // Guardamos los cambios
        $invoice->save();
        
        return $invoice;
    }
    
    public function updateInvoice($request, $invoiceId)
    {
        $invoice = Invoice::find($invoiceId);
        $invoice->fill($request->input("invoice"));
        $invoice->save();

        return $invoice;
    }
}
