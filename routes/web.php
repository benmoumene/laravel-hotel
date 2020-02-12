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

// Devuelve los datos necesarios para iniciar la app
Route::get('/hotel/fetch', 'HotelController@index');

// =============================================
// CUSTOMER
// =============================================
// Nuevo
Route::post('/customers', 'CustomerController@store');
// Actualizar
Route::put('/customers/{customer_id}', 'CustomerController@update');
// Borrar
Route::delete('/customer/{customer_id}', 'CustomerController@destroy');
// =============================================

// =============================================
// RESERVATIONS
// =============================================
// Nuevo
Route::post('/reservations', 'ReservationController@store');
// Actualiza reserva
Route::put('/reservations/{reservation_id}', 'ReservationController@update');
// Borrar reserva
Route::delete('/reservations/{reservation_id}', 'ReservationController@destroy');
// Cancelar reserva
Route::get('/reservation/{reservation_id}/cancel', 'ReservationController@cancel');
// =============================================

// =============================================
// GUEST
// =============================================
// Nuevo
Route::post('/guest', 'GuestController@store');
// Llegada de guest
Route::post('/guest/{reservation_id}/checkin', 'GuestController@checkIn');
// Salid de guest
Route::post('/guest/{reservation_id}/checkout', 'GuestController@checkOut');
// Actualizar datos guest
Route::put('/guest/{guest_id}', 'GuestController@update');

// =============================================
// ROOMS
// =============================================
// Nuevo Habitacion
Route::post('/room', 'RoomController@store');
// Actualizar Habitacion
Route::put('/room/{room_id}', 'RoomController@update');
// =============================================

// =============================================
// SERVICIOS
// =============================================
// Nuevo servicio
Route::post('/services', 'ServiceController@store');
// Actualizar servicio
Route::put('/services/{service_id}', 'ServiceController@update');
// =============================================

// =============================================
// RUTAS DEL INVENTARIO DEL HOTEL
// =============================================
// Nuevo Item de inventario
Route::post('/inventory', 'InventoryController@store');
// Actualizar item
Route::put('/inventory/{item_id}', 'InventoryController@update');
// =============================================

// =============================================
// RUTAS DE LAS FACTURAS
// =============================================
// Generar factura
Route::post('/invoice', 'InvoiceController@store');
// Pagar
Route::put('/invoice/{invoice_id}/pay', 'InvoiceController@setAsPaid');
// Recalcular
Route::post('/invoice/{invoice_id}/recalc', 'InvoiceController@recalculate');
// Actualizar factura
//Route::put('/invoice/{invoice_id}', 'InvoiceController@update');
// Borrar factura
Route::delete('/invoice/{invoice_id}', 'InvoiceController@destroy');
// =============================================


// =============================================
// OTRAS RUTAS
// =============================================
// Actualizar setting (middleware admin)
Route::put('/settings/{setting_id}', 'SettingController@update')->middleware('role:admin');
// Actualizar perfil
Route::put('/users/{user_id}', 'ProfileController@update');
// Borrar Billed Service
Route::delete('/billed_service/{billed_service_id}', 'BilledServiceController@destroy');
// =============================================
