import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Datos de usuario y perfil
        appUser: { name: '' },
        guests: [],
        rooms: [],
        services: [],

    },
    getters: {
        getGuest: (state, getters) => (clientId) => {

        },
        getRoomById: (state, getters) => (roomId) => {
            return state.rooms.find(room => room.id === roomId);
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
        SET_SERVICES(state, services) {
            state.services = services;
        },
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        // Agrega un usuario a people
        ADD_GUEST(state, guest) {
            state.guests.push(guest);
        },
        ADD_ROOM(state, room) {
            state.rooms.push(room);
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
                    // Rooms
                    context.commit('SET_ROOMS', data['rooms']);
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
                guest
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

        addRoom(context, room) {
            axios.post("http://127.0.0.1:8000/room/", {
                room
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newRoom = response['data']['room'];
                    context.commit('ADD_ROOM', newRoom);
                }
            });
        },

    }
})
