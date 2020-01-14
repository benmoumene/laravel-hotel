<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Customer;
use App\Guest;
use App\Room;
use App\Reservation;
use App\Setting;
use App\Service;
use App\InventoryItem;
use App\Invoice;

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
        $data['reservations'] = Reservation::with(['customer', 'room'])->get();
        $data['services'] = Service::all();
        $data['rooms'] = Room::with('reservations')->get();
        $data['settings'] = Setting::all();
        $data['inventory'] = InventoryItem::all();
        $data['invoices'] = Invoice::all(); // with client
        return response()->json($data, 200);
    }
}
