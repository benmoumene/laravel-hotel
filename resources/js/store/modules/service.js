export default ({
    namespaced: true,
    state: {
        services: {},
    },
    getters: {
        getService: (state, getters) => (serviceId) => {
            return state.services[serviceId];
        },
        getServices: (state) => {
            return Object.keys(state.services).map(
                id => state.services[id]
            );
        },
    },
    mutations: {
        SET_SERVICES(state, services) {
            state.services = services;
        },
        ADD_SERVICE(state, service) {
            //state.services.push(service);
            Vue.set(state.services, service.id, service);
        },
        UPDATE_SERVICE(state, service) {
            Vue.set(state.services, service.id, service);
        },
    },
    actions: {
        storeService(context, { vm, service }) {
            axios.post("/services/", {
                service
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newService = response.data.service;
                    context.commit('ADD_SERVICE', newService);
                    vm.makeToast("Service added", 'The service ' + newService.name
                        + ' has been added.', 'success');
                }
            }).catch(function (error) {
                vm.makeToast("Services", "Something went wrong.", "danger");
            });
        },
        updateService(context, { vm, service }) {
            axios.post("/services/" + service.id, {
                service,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    let newService = response.data.service;
                    context.commit("UPDATE_SERVICE", newService);
                    vm.makeToast("Service updated", 'The service ' + service.name
                        + ' has been updated.', 'success');
                }
            }).catch(function (error) {
                vm.makeToast("Services", "Something went wrong.", "danger");
            });
        },
    }
})
