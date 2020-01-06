<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Setting;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->middleware('auth');
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
        $setting = Setting::where('id', $id)->first();
        $setting->value = $request['setting']['value'];
        $setting->save();
                
        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['setting' => $setting], 200);
    }
}
