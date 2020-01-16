import Vuex from 'vuex'
import Vue from 'vue'

// Modules
import room from './modules/room'
import service from './modules/service'
import customer from './modules/customer'
import reservation from './modules/reservation'
import inventory from './modules/inventory'
import billing from './modules/billing'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        room, service, customer, inventory, reservation, billing
    },
    state: {
        // Datos de usuario y perfil
        appUser: { name: '' },
        settings: [],
        guests: [],
    },
    getters: {
        getGuest: (state, getters) => (clientId) => {

        },
        getSettingValue: (state, getters) => (name) => {
            var setting = state.settings.find(setting => setting.name === name);
            if (typeof setting !== 'undefined') {
                return setting.value;
            }
        },
        isAdmin: (state, getters) => {
            if (state.appUser.role === 'admin') {
                return true;
            }
            return false;
        },
        isManager: (state, getters) => {
            if (state.appUser.role === 'manager') {
                return true;
            }
            return false;
        },
        isRecepcionist: (state, getters) => {
            if (state.appUser.role === 'recepcionist') {
                return true;
            }
            return false;
        },
    },
    mutations: {
        // Asigna el usuario de la app
        SET_USER(state, user) {
            state.appUser = user;
        },
        // 
        SET_GUESTS(state, guests) {
            state.guests = guests;
        },
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },

        // Agrega un usuario a people
        ADD_GUEST(state, guest) {
            state.guests.push(guest);
        },
    },
    actions: {
        // Selecciona el usuario con el id indicado
        selectClientById(context, userId) {
            var client = context.getters.getClientById(clientId);
            //context.commit('SET_SELECTED_USER', client);
        },

        // Este metodo realiza una peticion al backend y recibe los datos
        // necesarios para inicializar la aplicacion
        fetchData(context) {
            axios.get("http://127.0.0.1:8000/hotel/fetch").then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    var data = response["data"];

                    // Userdata
                    context.commit('SET_USER', data['app_user']);
                    // Guests
                    context.commit('SET_GUESTS', data['guests']);
                    // Customers
                    context.commit('customer/SET_CUSTOMERS', data['customers']);
                    // Settings
                    context.commit('SET_SETTINGS', data['settings']);
                    // Services
                    context.commit('service/SET_SERVICES', data['services']);
                    // Reservations
                    context.commit('reservation/SET_RESERVATIONS', data['reservations']);
                    // Invoices
                    context.commit('billing/SET_INVOICES', data['invoices']);
                    // Inventory
                    context.commit('inventory/SET_ITEMS', data['inventory']);
                    // Rooms
                    context.commit('room/SET_ROOMS', data['rooms']);
                }
            });
        },
        logout(context) {
            axios.post("http://127.0.0.1:8000/logout").catch(error => {
                window.location.href = '/login';
            });
        },
        addGuest(context, guest) {
            axios.post("http://127.0.0.1:8000/guest/", {
                guest
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newGuest = response['data']['guest'];
                    context.commit('ADD_GUEST', newGuest);
                }
            });
        },
        editGuest(context, guest) {
            axios.post("http://127.0.0.1:8000/guest/", {
                guest,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    // console.log('success');
                }
            });
        },
        editSetting(context, setting) {
            axios.post("http://127.0.0.1:8000/settings/" + setting.id, {
                setting,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    console.log('success');
                }
            });
        },
        uploadAvatar(context, avatar) {
            //return console.log("uploading");
            //return console.log(context.state.appUser.id);
            var userId = context.state.appUser.id;
            console.log(avatar);
            var fd = new FormData();
            fd.append('image', avatar);
            fd.append('_method', 'put');
            axios.post("http://127.0.0.1:8000/users/" + userId, fd).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    context.state.appUser.avatar_filename = response['data']['avatar'];
                }
            });
        },
    }
})
