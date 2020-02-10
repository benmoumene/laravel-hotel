import Vuex from 'vuex'
import Vue from 'vue'

// Modules
import room from './modules/room'
import service from './modules/service'
import customer from './modules/customer'
import reservation from './modules/reservation'
import inventory from './modules/inventory'
import billing from './modules/billing'
import guest from './modules/guest'
import billed_services from './modules/billed_services'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        room, service, customer, inventory,
        reservation, billing, guest, billed_services
    },
    state: {
        // Datos de usuario y perfil
        appUser: { name: '' },
        settings: [],
        ready: false
    },
    getters: {
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
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },
        SET_READY(state, ready) {
            state.ready = ready;
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
                    // Settings
                    context.commit('SET_SETTINGS', data['settings']);
                    // Guests
                    context.commit('guest/SET_GUESTS', data['guests']);
                    // Customers
                    context.commit('customer/SET_CUSTOMERS', data['customers']);
                    // Services
                    context.commit('service/SET_SERVICES', data['services']);
                    // Billed Services
                    context.commit('billed_services/SET_BILLED_SERVICES', data['billed_services']);
                    // Reservations
                    context.commit('reservation/SET_RESERVATIONS', data['reservations']);
                    // Invoices
                    context.commit('billing/SET_INVOICES', data['invoices']);
                    // Inventory
                    context.commit('inventory/SET_ITEMS', data['inventory']);
                    // Rooms
                    context.commit('room/SET_ROOMS', data['rooms']);
                    context.commit('SET_READY', true);
                }
            });
        },
        logout(context) {
            axios.post("http://127.0.0.1:8000/logout").catch(error => {
                window.location.href = '/login';
            });
        },
        editSetting(context, { vm, setting }) {
            axios.post("/settings/" + setting.id, {
                setting,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    vm.makeToast("Setting updated", 'The setting ' + setting.name
                        + ' has been updated.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The setting cannot be updated!', 'danger');
            });
        },
        uploadAvatar(context, { vm, avatar }) {
            var userId = context.state.appUser.id;
            var fd = new FormData();
            fd.append('image', avatar);
            fd.append('_method', 'put');
            axios.post("http://127.0.0.1:8000/users/" + userId, fd).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    context.state.appUser.avatar_filename = response['data']['avatar'];
                    vm.makeToast("Avatar updated", 'The avatar has been updated.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The avatar cannot be updated!', 'danger');
            });
        },
    }
})
