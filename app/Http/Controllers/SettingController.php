<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Setting;
use App\Services\SettingService;

class SettingController extends Controller
{
    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
        $this->middleware('auth');
    }

    // Metodo para gestionar los request de actualizacion (Setting)
    public function update(Request $request, $settingId)
    {
        // Utilizamos SettingService para la logica.
        $setting = $this->settingService->updateSetting(
            $request,
            $settingId
        );

        // En caso de error al actualizar ...
        if (!$setting) {
            return response()->json([
                "error" => "Setting cannot be updated."
            ], 500);
        }
        
                
        // Todo fue bien!
        return response()->json(['setting' => $setting], 200);
    }
}
