export default ({
    namespaced: true,
    state: {
        services: [],
    },
    getters: {

    },
    mutations: {
        SET_SERVICES(state, services) {
            state.services = services;
        },
        ADD_SERVICE(state, service) {
            state.services.push(service);
        },
    },
    actions: {
        addService(context, service) {
            axios.post("http://127.0.0.1:8000/services/", {
                service
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newService = response['data']['service'];
                    context.commit('ADD_SERVICE', newService);
                }
            });
        },
        editService(context, service) {
            axios.post("http://127.0.0.1:8000/services/" + service.id, {
                service,
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
    }
})
