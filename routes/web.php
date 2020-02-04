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

// Nueva reserva
Route::post('/reservations', 'ReservationController@store');
// Actualiza reserva
Route::put('/reservations/{reservation_id}', 'ReservationController@update');
// Cancelar reserva
Route::delete('/reservations/{reservation_id}', 'ReservationController@destroy');

// Nuevo guest
Route::post('/guest', 'GuestController@store');
// Actualizar datos guest
Route::put('/guest/{guest_id}', 'GuestController@update');

// Nuevo Habitacion
Route::post('/room', 'RoomController@store');
// Actualizar Habitacion
Route::put('/room/{room_id}', 'RoomController@update');

// Actualizar setting (middleware admin)
Route::put('/settings/{setting_id}', 'SettingController@update')->middleware('role:admin');

// Actualizar Avatar
Route::put('/users/{user_id}', 'ProfileController@update');

// Nuevo servicio
Route::post('/services', 'ServiceController@store');
// Actualizar servicio
Route::put('/services/{service_id}', 'ServiceController@update');

// Nuevo Item de inventario
Route::post('/inventory', 'InventoryController@store');
// Actualizar item
Route::put('/inventory/{item_id}', 'InventoryController@update');

// Generar factura
Route::post('/invoice', 'InvoiceController@store');
// Actualizar factura
Route::put('/invoice/{invoice_id}', 'InvoiceController@update');
// Borrar factura
Route::delete('/invoice/{invoice_id}', 'InvoiceController@destroy');

// Borrar Billed Service
Route::delete('/billed_service/{billed_service_id}', 'BilledServiceController@destroy');
