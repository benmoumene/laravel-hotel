<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Http\Requests\ProfileUpdateRequest;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    public function __construct(ProfileService $profileService)
    {
        $this->middleware('auth');
        $this->profileService = $profileService;
    }

    // Metodo para gestionar los request de actualizacion (Profile)
    public function update(ProfileUpdateRequest $request, $id)
    {
        // Utilizamos ProfileService para la logica.
        $profile = $this->profileService->updateProfile($request, $id);
        return response()->json(['profile' => $profile], 200);
    }
}
