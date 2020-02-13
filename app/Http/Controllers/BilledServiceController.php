<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\BilledService;

class BilledServiceController extends Controller
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
        $service = new BilledService;
        $service->reservation_id = $request['billed_service']['reservation_id'];
        $service->service_id = $request['billed_service']['service_id'];
        //$service->billed_on = $request['service']['billed_on'];
        $service->save();
        return response()->json(['service' => $service], 200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $currentUserId = Auth::user()->id;
        $service = BilledService::where('id', $id)->first(); // firstOrFail???
        $service->delete();

        return response()->json(['service' => $service], 204);
    }
}
