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
Route::put('/customers/{id}', 'CustomerController@update');
// Borrar
Route::delete('/customers/{id}', 'CustomerController@destroy');
// =============================================
// RESERVATIONS
// =============================================
// Nuevo
Route::post('/reservations', 'ReservationController@store');
// Actualiza reserva
Route::put('/reservations/{id}', 'ReservationController@update');
// Borrar reserva
Route::delete('/reservations/{id}', 'ReservationController@destroy');
// Cancelar reserva
Route::get('/reservations/{id}/cancel', 'ReservationController@cancel');
// =============================================

// =============================================
// GUEST
// =============================================
// Llegada de guest
Route::post('/guests/{id}/checkin', 'GuestController@checkIn');
// Salid de guest
Route::post('/guests/{id}/checkout', 'GuestController@checkOut');
// =============================================
// ROOMS
// =============================================
// Nuevo Habitacion
Route::post('/rooms', 'RoomController@store');
// Actualizar Habitacion
Route::put('/rooms/{id}', 'RoomController@update');
// =============================================

// =============================================
// SERVICIOS
// =============================================
// Nuevo servicio
Route::post('/services', 'ServiceController@store');
// Actualizar servicio
Route::put('/services/{id}', 'ServiceController@update');
// Borrar Servicio
Route::delete('/services/{id}', 'ServiceController@destroy');
// =============================================

// =============================================
// RUTAS DEL INVENTARIO DEL HOTEL
// =============================================
// Nuevo Item de inventario
Route::post('/inventory-items', 'InventoryController@store');
// Actualizar item
Route::put('/inventory-items/{id}', 'InventoryController@update');
// Eliminar item
Route::delete('/inventory-items/{id}', 'InventoryController@destroy');
// =============================================

// =============================================
// RUTAS DE LAS FACTURAS
// =============================================
// Generar factura
Route::post('/invoices', 'InvoiceController@store');
// Recalcular
Route::post('/invoices/{id}/recalc', 'InvoiceController@recalculate');
// Actualizar factura
Route::put('/invoices/{id}', 'InvoiceController@update');
// Borrar factura
//Route::delete('/invoices/{id}', 'InvoiceController@destroy');
// =============================================

// =============================================
// BILLED SERVICES
// =============================================
// Borrar Billed Service
Route::delete('/billed-services/{id}', 'BilledServiceController@destroy');
// Agregar Billed service
Route::post('/billed-services', 'BilledServiceController@store');

// =============================================
// OTRAS RUTAS
// =============================================
// Actualizar setting (middleware admin)
Route::put('/settings/{id}', 'SettingController@update')->middleware('role:admin');
// Actualizar perfil
Route::put('/users/{id}', 'ProfileController@update');
// =============================================
