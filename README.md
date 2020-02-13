# laravel-hotel (Management)
Esta aplicacion es un dashboard que permite gestionar el Backend de un hotel. La gestion permite modificar Clientes/Inventario/Facturacion/Servicios/Habitaciones/Reservas.

## Tecnologias
- Laravel
- VueJS/Vuex
- AdminLTE Dashboard Bootstrap-vue + VueRouter
- Chart.js/D3 Charts ???

## Funcionalidades
- Informacion de clientes (Huespedes actualmente o no)
- Seguimiento de las huespedes del hotel.
- Sistema de reserva de habitaciones
- Facturacion de gastos del huesped
- Servicios ofrecidos por el hotel
- Inventario de items usados en el hotel (Toallas, Comidas ...)
- Sistema de roles (Recepcionista/Manager/Admin)
- Perfil de usuario (Permite subir avatares al servidor)

## Pendiente
- Implementar el resto de la aplicacion  (Guest)
- Mejorar y Terminar el sistema de invoices
- Reorganizacion y mejora de nombres de archivos/carpetas
- Validacion y Filtros de input (tambien para el avatar) Request.
- Terminar de implementar los roles en la app
===============
- Eliminar dependencia de jQuery del sidebar, hacer todo en js y vue
- Terminar de implmentar las relaciones de Eloquent en los modelos
- Mejorar codigo(nombre de metodos etc...) de las stores/routes
- Limpieza de codigo y separacion de la logica del backend en Services
- Pensar en otros usos al dashboard. Mostrar habitaciones libres???