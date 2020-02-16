<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Invoice;
use App\Services\InvoiceService;
use App\Http\Requests\InvoiceUpdateRequest;

class InvoiceController extends Controller
{
    public function __construct(InvoiceService $invoiceService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->invoiceService = $invoiceService;
    }

    public function store(Request $request)
    {
        $invoice = $invoiceService->storeInvoice($request);
        return response()->json(['invoice' => $invoice], 200);
    }

    public function update(InvoiceUpdateRequest $request, $invoiceId)
    {
        $invoice = $this->invoiceService->updateInvoice($request, $invoiceId);
        return response()->json(['invoice' => $invoice], 200);
    }

    public function recalculate(Request $request, $id)
    {
        $invoice = Invoice::with('customer:customers.id')->find($id);
        $invoice->generate();
        return response()->json(['invoice' => $invoice], 200);
    }

    public function destroy($id)
    {
        //
    }
}
