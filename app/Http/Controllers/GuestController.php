<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Guest;

class GuestController extends Controller
{
    public function __construct()
    {
        // Se necesita esta autentificado para llevar a cabo acciones
        $this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentUserId = Auth::user()->id;
        $guest = new Guest;
        $guest->first_name = $request['guest']['first_name'];
        $guest->last_name = $request['guest']['last_name'];
        $guest->address = $request['guest']['address'];
        $guest->phone = $request['guest']['phone'];
        $guest->sex = $request['guest']['sex'];
        $guest->nationality = $request['guest']['nationality'];
        $guest->document_id_type = $request['guest']['document_id_type'];
        $guest->document_id = $request['guest']['document_id'];
        $guest->save();

        return response()->json(['guest' => $guest], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $currentUserId = Auth::user()->id;
        $guest = Guest::where('id', $id)->first(); // firstOrFail???
        $guest->first_name = $request['guest']['first_name'];
        $guest->last_name = $request['guest']['last_name'];
        $guest->address = $request['guest']['address'];
        $guest->phone = $request['guest']['phone'];
        $guest->sex = $request['guest']['sex'];
        $guest->nationality = $request['guest']['nationality'];
        $guest->document_id_type = $request['guest']['document_id_type'];
        $guest->document_id = $request['guest']['document_id'];
        $guest->save();

        return response()->json(['guest' => $guest], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
