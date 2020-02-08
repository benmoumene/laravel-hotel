<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Invoice;

class InvoiceController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentUserId = Auth::user()->id;
        $invoice = new Invoice;
        $invoice->guest_id = $request['invoice']['guest_id'];
        $invoice->total = $request['invoice']['total'];
        $invoice->generated_on = $request['invoice']['generated_on'];
        $invoice->save();
        return response()->json(['invoice' => $invoice], 200);
    }

    public function setAsPaid(Request $request, $id)
    {
        $invoice = Invoice::where('id', $id)->first();
        $invoice->status = 'paid';
        $invoice->payment_method = $request['invoice']['payment_method'];
        $invoice->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $currentUserId = Auth::user()->id;
        $invoice = Invoice::where('id', $id)->first();
        // Calcular total
        $invoice->total = $invoice->billedServices->sum('service.cost');

        $invoice->status = $request['invoice']['status'];
        $invoice->payment_method = $request['invoice']['payment_method'];
        if ($invoice->generated_on != $request['invoice']['generated_on']) {
            $invoice->generated_on = date('Y-m-d H:i:s');
        }
        $invoice->save();
                
        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['invoice' => $invoice], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
