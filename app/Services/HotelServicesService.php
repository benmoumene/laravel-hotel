<?php

namespace App\Services;

use App\Service;

class HotelServicesService
{
    public function storeService($request)
    {
        // Creamos un nuevo Service usando los datos recibidos
        $service = new Service($request->input("service"));
        
        // Guardamos y en caso de error retornamos false
        if (!$service->save()) {
            return false;
        }

        // Se devuelve el modelo service, ya que todo fue bien.
        return $service;
    }

    // Metodo con la logica para actualizar Service
    public function updateService($request, $serviceId)
    {
        // Buscamos El Service
        $service = Service::find($serviceId);

        // El Service no existe ...
        if (!$service) {
            return false;
        }

        // La service exista, asignamos nuevos valores mediante mass
        // assigment.
        $service->fill($request->input("service"));
        
        // Guardamos y en caso de error retornamos false
        if (!$service->save()) {
            return false;
        }

        // Se devuelve el modelo Service al haber guardado con exito.
        return $service;
    }
}
