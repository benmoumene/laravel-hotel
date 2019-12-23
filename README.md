# laravel-hotel (Management)
Esta aplicacion es un dashboard (Backend) que permite gestionar Clientes/Inventario/Facturacion/Servicios(mini-bar, desayuno...)/Reservas de un hotel/Habitaciones.

## Tecnologias
- Laravel
- Custom Dashboard usando bootstrap-vue y vuerouter
- VueJS/Vuex/VueRouter
- Chart.js/D3 Charts

## Funcionamiento 
- Registramos un cliente
- Cliente hace reserva
- Cliente consume servicios (y aumenta la facturacion)
- Cliente abandona el hotel y se genera una factura para cobrarle
- La app pone la habitacion como pendiente (Pendiente de preparacion/limpieza etc...)
- Despues de preparar poner libre

## Pendiente
================
- Usar ServiceProvider de Laravel
- Vuex/Vue Router/VueJS
- Only Backend
- Implementar Roles: Recepcion (Gestiona Reservas/Altas/Bajas), Gestion (Inventario), Sales (Billing)
- Tablas: clients, habitaciones, rerservations, inventary, billing
- Login > Dashboard (Eliminar barra de laravel)
