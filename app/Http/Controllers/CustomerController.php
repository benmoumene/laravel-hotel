<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Customer;

class CustomerController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $customer = new Customer;
        $customer->first_name = $request['customer']['first_name'];
        $customer->last_name = $request['customer']['last_name'];
        $customer->address = $request['customer']['address'];
        $customer->phone = $request['customer']['phone'];
        $customer->sex = $request['customer']['sex'];
        $customer->nationality = $request['customer']['nationality'];
        $customer->document_id_type = $request['customer']['document_id_type'];
        $customer->document_id = $request['customer']['document_id'];
        $customer->save();

        return response()->json(['customer' => $customer], 200);
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
        $customer = Customer::where('id', $id)->first(); // firstOrFail???
        $customer->first_name = $request['customer']['first_name'];
        $customer->last_name = $request['customer']['last_name'];
        $customer->address = $request['customer']['address'];
        $customer->phone = $request['customer']['phone'];
        $customer->sex = $request['customer']['sex'];
        $customer->nationality = $request['customer']['nationality'];
        $customer->document_id_type = $request['customer']['document_id_type'];
        $customer->document_id = $request['customer']['document_id'];
        $customer->save();

        return response()->json(['customer' => $customer], 200);
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
