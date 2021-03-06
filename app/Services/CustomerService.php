<?php

namespace App\Services;

use App\Customer;

class CustomerService
{
    public function storeCustomer($request)
    {
        // Creamos una nueva Customer usando los datos recibidos
        $customer = new Customer($request->input("customer"));
        
        // Guardamos los cambios
        $customer->save();

        // Se devuelve el modelo Customer, ya que todo fue bien.
        return $customer;
    }

    // Metodo con la logica para actualizar Customer
    public function updateCustomer($request, $customerId)
    {
        // Buscamos la Customer
        $customer = Customer::findOrFail($customerId);

        // La Customer exista, asignamos nuevos valores mediante mass
        // assigment.
        $customer->fill($request->input("customer"));
        
        // Guardamos los cambios
        $customer->save();

        // Se devuelve el modelo Customer al haber guardado con exito.
        return $customer;
    }
}
