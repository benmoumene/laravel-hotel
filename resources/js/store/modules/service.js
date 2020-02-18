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
                // Objeto recibido
                let newService = response.data.service;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newService.hasOwnProperty("id")) {
                    context.commit("ADD_SERVICE", newService);
                    vm.makeToast("Services", newService.name
                        + " has been added.", "success");
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
                // Objeto recibido
                let newService = response.data.service;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newService.hasOwnProperty("id")) {
                    context.commit("UPDATE_SERVICE", newService);
                    vm.makeToast("Services", newService.name
                        + " has been updated.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Services", "Something went wrong.", "danger");
            });
        },
    }
})
