<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index');
Route::get('/hotel/fetch', 'HotelController@index');

// Nuevo customer
Route::post('/customers', 'CustomerController@store');
// Actualizar datos customer
Route::put('/customers/{customer_id}', 'CustomerController@update');

// Nuevo guest
Route::post('/guest', 'GuestController@store');
// Actualizar datos guest
Route::put('/guest/{guest_id}', 'GuestController@update');

// Nuevo Habitacion
Route::post('/room', 'RoomController@store');
// Actualizar Habitacion
Route::put('/room/{room_id}', 'RoomController@update');
