<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Http\Requests\ProfileUpdateRequest;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->middleware('auth');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProfileUpdateRequest $request, $id)
    {
        $currentUser = Auth::user();
        if ($request->has('image')) {
            $date = date("Y-m-d H:i:s");
            $filename = md5($date); // uniqueid
            $request->image->storeAs('public', $filename);
            $currentUser->avatar_filename = $filename;
        }

        if ($request->has('profile')) {
            $currentUser->name = $request->input('profile.name');
            $currentUser->first_name = $request->input('profile.first_name');
            $currentUser->last_name = $request->input('profile.last_name');
        }
        
        $currentUser->save();
        return response()->json(['profile' => $currentUser], 200);
    }
}
