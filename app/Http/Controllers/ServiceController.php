<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Service;

class ServiceController extends Controller
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
        $service = new Service;
        $service->name = $request['service']['name'];
        $service->cost = $request['service']['cost'];
        $service->comments = $request['service']['comments'];
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
        // ID del usuario logeado en la app
        $currentUserId = Auth::user()->id;
        $service = Service::where('id', $id)->first();
        $service->name = $request['service']['name'];
        $service->cost = $request['service']['cost'];
        $service->comments = $request['service']['comments'];
        $service->save();
                
        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['service' => $service], 200);
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
