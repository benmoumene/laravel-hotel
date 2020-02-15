<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Customer;
use App\Services\CustomerService;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{
    public function __construct(CustomerService $customerService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->customerService = $customerService;
    }
    
    public function store(CustomerRequest $request)
    {
        // Utilizamos CustomerService para la logica.
        $customer = $this->customerService->storeCustomer($request);

        // En caso de que el servicio retorne false ...
        if (!$customer) {
            return response()->json([
                "error" => "Customer cannot be created."
            ], 500);
        }

        return response()->json(['customer' => $customer], 200);
    }

    public function update(CustomerRequest $request, $customerId)
    {
        // Utilizamos CustomerService para la logica.
        $customer = $this->customerService->updateCustomer($request, $customerId);

        // En caso de que el servicio retorne false ...
        if (!$customer) {
            return response()->json([
                "error" => "Customer cannot be updated."
            ], 500);
        }

        return response()->json(['customer' => $customer], 200);
    }

    public function destroy($id)
    {
        //
    }
}
