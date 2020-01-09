<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;

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
    public function update(Request $request, $id)
    {
        //if ($request->has('avatar')) {
        //}
        $date = date("Y-m-d H:i:s");
        $filename = md5($date);
        $request->image->storeAs('public', $filename);
        $currentUser = Auth::user();
        $currentUser->avatar_filename = $filename;
        $currentUser->save();

        return response()->json(['avatar' => $filename], 200);
    }
}
