<?php

namespace App\Services;

use App\Setting;

class SettingService
{
    // Metodo que contiene la logica para actualizar una Setting
    public function updateSetting($request, $settingId)
    {
        // Buscamos la opcion
        $setting = Setting::findOrFail($settingId);

        // Actualizamos la Setting mediante mass assigment
        $setting->fill($request->input("setting"));

        // Guardado y en caso de fallo retornar false ...
        if (!$setting->save()) {
            return false;
        }

        // Todo fue bien, se devuelve el modelo (Setting)
        return $setting;
    }
}
