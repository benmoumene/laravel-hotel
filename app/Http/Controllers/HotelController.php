<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Customer;
use App\Guest;
use App\Room;

class HotelController extends Controller
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
        // ID del usuario logeado en la app
        $currentUserId = Auth::user()->id;
        $data['app_user'] = Auth::user();
        $data['guests'] = Guest::all();
        $data['customers'] = Customer::all();
        $data['rooms'] = Room::all();
        return response()->json($data, 200);
    }
}
