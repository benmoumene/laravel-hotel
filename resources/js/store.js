import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Datos de usuario y perfil
        appUser: { profile: {} }
    },
    getters: {
        // Obtiene la conversacion entre 2 usuarios usando el id de usuario
        getUser: (state, getters) => (userId) => {
            
        },
        
    },
    mutations: {
        // Agrega un usuario a people
        ADD_PEOPLE(state, user) {
            state.people.push(user);
        },
        
    },
    actions: {
        // Selecciona el usuario con el id indicado
        selectUserById(context, userId) {
            var user = context.getters.getUserById(userId);
            context.commit('SET_SELECTED_USER', user);
        },
        
    }
})
