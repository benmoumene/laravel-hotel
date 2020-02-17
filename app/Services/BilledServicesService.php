<?php

namespace App\Services;

use App\BilledService;

class BilledServicesService
{
    public function storeService($request)
    {
        // Creamos un nuevo Service usando los datos recibidos
        $service = new BilledService($request->input("billed_service"));
        $service->billed_on = date("Y-m-d H:i:s");
        
        // Guardamos y en caso de error retornamos false
        $service->save();

        // Se devuelve el modelo service, ya que todo fue bien.
        return $service;
    }

    // Metodo con la logica para borrar un service
    public function destroyService($serviceId)
    {
        // Buscamos El Service
        $service = BilledService::findOrFail($serviceId);
        $service->delete();

        // Se devuelve el modelo Service al haber guardado con exito.
        return $service;
    }
}
