import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Datos de usuario y perfil
        appUser: { name: 'non-set' },
        clients: [],
        rooms: [],
        services: [],

    },
    getters: {
        getClient: (state, getters) => (clientId) => {

        },

    },
    mutations: {
        // Asigna el usuario de la app
        SET_USER(state, user) {
            state.appUser = user;
        },
        // Agrega un usuario a people
        ADD_CLIENT(state, client) {
            state.clients.push(client);
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
                }
            });
        },
        logout(context) {
            axios.post("http://127.0.0.1:8000/logout").catch(error => {
                window.location.href = '/login';
            });;
        }

    }
})
