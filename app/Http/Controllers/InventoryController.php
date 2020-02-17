<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\InventoryItem;
use App\Services\InventoryService;
use App\Http\Requests\InventoryItemRequest;

class InventoryController extends Controller
{
    public function __construct(InventoryService $inventoryService)
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
        $this->inventoryService = $inventoryService;
    }

    public function store(InventoryItemRequest $request)
    {
        $item = $this->inventoryService->storeItem($request);
        return response()->json(['item' => $item], 200);
    }

    public function update(InventoryItemRequest $request, $itemId)
    {
        $item = $this->inventoryService->updateItem($request, $itemId);
        return response()->json(['item' => $item], 200);
    }

    public function destroy($id)
    {
        //
    }
}
