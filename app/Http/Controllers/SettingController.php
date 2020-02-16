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

        // Todo fue bien!
        return response()->json(['setting' => $setting], 200);
    }
}
