<?php

namespace App\Services;

use App\InventoryItem;

class InventoryService
{
    public function storeItem($request)
    {
        // Creamos una nueva Item usando los datos recibidos
        $item = new InventoryItem($request->input("item"));
    
        // Guardamos los cambios
        $item->save();

        // Se devuelve el modelo InventoryItem, ya que todo fue bien.
        return $item;
    }

    // Metodo que contiene la logica para actualizar una InventoryItem
    public function updateItem($request, $itemId)
    {
        // Buscamos la opcion
        $inventoryItem = InventoryItem::findOrFail($itemId);

        // Actualizamos la InventoryItem mediante mass assigment
        $inventoryItem->fill($request->input("item"));
        $inventoryItem->save();

        // Todo fue bien, se devuelve el modelo (InventoryItem)
        return $inventoryItem;
    }
}
