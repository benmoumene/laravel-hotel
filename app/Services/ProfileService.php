<?php

namespace App\Services;

use App\Profile;
use Auth;

class ProfileService
{
    // Almacena la imagen en el servidor
    private function uploadAvatar($image)
    {
        // Datetime actual
        $date = date("Y-m-d H:i:s");

        // Nombre del fichero
        $filename = md5($date);

        // Almacenamos en disco
        $image->storeAs('public', $filename);

        // Se devuelve el nombre del fichero
        return $filename;
    }

    // Logica para actualizar el perfil de usuario
    public function updateProfile($request, $userId)
    {
        // Buscamos el usuario que esta logeado actualmente
        $profile = Profile::find(Auth::user()->id);

        // El usuario no existe
        if (!$profile) {
            return false;
        }

        // La peticion contiene una imagen para subir
        if ($request->has('image')) {
            // Llamamos al metodo para guardar la imagen
            $filename = $this->uploadAvatar($request->image);

            // El nombre del fichero se almacena en el campo
            // avatar_filename de la tabla users.
            $profile->avatar_filename = $filename;
        }

        // Si el usuario ha enviado datos para actualizar el perfil
        if ($request->has('profile')) {
            // Asignamos los nuevos valores usando mass asigment
            $profile->fill($request->input("profile"));
        }
        
        // Si no se consigue guardar retorna false
        if (!$profile->save()) {
            return false;
        }

        // Devolvemos el perfil con los nuevos datos.
        return $profile;
    }
}
