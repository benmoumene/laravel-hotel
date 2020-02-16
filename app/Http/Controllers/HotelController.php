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
use App\Profile;
use App\Invoice;
use App\BilledService;

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
        
        // Datos de usuario
        $data['app_user'] = Profile::profile()->find($currentUserId);

        // Datos de los clientes del hotel
        $data['customers'] = Customer::with(
            ['invoices:invoices.id', 'reservations:reservations.id']
        )->get();
        
        // Huespedes
        $data['guests'] = Guest::with(
            ['customer:customers.id', 'room:rooms.id']
        )->get();

        // Reservas
        $data['reservations'] = Reservation::with('guest:guests.id')->get();

        // Servicios
        $data['services'] = Service::get();
        $data['rooms'] = Room::get();
        $data['settings'] = Setting::get();
        $data['inventory'] = InventoryItem::get();
        // Facturas con el cliente asociado.
        $data['invoices'] = Invoice::with(['customer:customers.id'])->get();

        // Servicios facturados
        $data['billed_services'] = BilledService::get();
        return response()->json($data, 200);
    }
}
