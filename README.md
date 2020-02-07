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
- Reorganizar las DB y enviar datos a VUE de la siguiente manera:
+ Se realizan las consutas con los joins necesarios para enviar al vue 
+ todos los datos asociados al usuario utilizando unicamente los IDs
+ En el cliente cuando queramos obtener informacion solo buscamos el id
+ en la store que corresponde. Al realizar modificaciones o borrado
+ las realizamos sobre las stores. En caso de no existir una primary
+ key simplemente devolvemos un string vacio o false para evitar errores.
- IMPLEMENTAR KEYS como INDEX en VUE para buscar mas facil y rapido.
- Terminar de implmentar las relaciones de Eloquent en los modelos
- Terminar de implementar los roles en la app
- Mejorar y Terminar el sistema de invoices
- Mejorar codigo(nombre de metodos etc...) de las stores/routes
- Reorganizacion y mejora de nombres de archivos/carpetas
- Limpieza de codigo y separacion de la logica del backend en Services
- Eliminar dependencia de jQuery del sidebar, hacer todo en js y vue
- Validacion y Filtros de input (tambien para el avatar) Request.
- Cambiar routes de web.php a api. Modificar llamadas a la api a /api/fetch???
- Mejorar backend y json enviado a la app. Enviar solo ids de los objetos??
- Pensar en otros usos al dashboard. Mostrar habitaciones libres???