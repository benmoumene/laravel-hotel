<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\InventoryItem;

class InventoryController extends Controller
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
        $item = new InventoryItem;
        $item->name = $request['item']['name'];
        $item->description = $request['item']['description'];
        $item->min_stock = $request['item']['min_stock'];
        $item->quantity = $request['item']['quantity'];
        $item->save();
        return response()->json(['item' => $item], 200);
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
        $item = InventoryItem::where('id', $id)->first();
        $item->name = $request['item']['name'];
        $item->description = $request['item']['description'];
        $item->min_stock = $request['item']['min_stock'];
        $item->quantity = $request['item']['quantity'];
        $item->save();
                
        // Devolvemos el json con el perfil y codigo 200
        return response()->json(['item' => $item], 200);
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
