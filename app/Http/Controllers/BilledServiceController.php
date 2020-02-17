<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\BilledService;
use App\Services\BilledServicesService;
use App\Http\Requests\BilledServiceRequest;

class BilledServiceController extends Controller
{
    public function __construct(BilledServicesService $service)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->consumedService = $service;
    }

    public function store(BilledServiceRequest $request)
    {
        $service = $this->consumedService->storeService($request);
        return response()->json(['service' => $service], 200);
    }

    public function destroy($id)
    {
        $service = $this->consumedService->destroyService($id);
        return response()->json(['service' => $service], 204);
    }
}
