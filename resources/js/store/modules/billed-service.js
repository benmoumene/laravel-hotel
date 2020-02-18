
export default ({
    namespaced: true,
    state: {
        billedServices: {},
    },
    getters: {
        getBilledServices: (state) => {
            return Object.keys(state.billedServices).map(
                id => state.billedServices[id]
            );
        },
        getBilledServicesFromReservation: (state, getters) => (reservationId) => {
            return getters.getBilledServices.filter(service =>
                service.reservation_id === reservationId
            );
        },
    },
    mutations: {
        ADD_SERVICE(state, service) {
            Vue.set(state.billedServices, service.id, service);
        },
        SET_BILLED_SERVICES(state, billed_services) {
            state.billedServices = billed_services;
        },
        REMOVE_SERVICE(state, id) {
            Vue.delete(state.billedServices, id);
        },
    },
    actions: {
        storeService(context, { vm, serviceId, reservationId }) {
            axios.post("/billed-services/", {
                billed_service: {
                    service_id: serviceId,
                    reservation_id: reservationId
                }
            }).then(function (response) {
                // Objeto recibido
                let newService = response.data.service;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newService.hasOwnProperty("id")) {
                    context.commit("ADD_SERVICE", newService);
                    vm.makeToast("Service", "Service has been added.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Billed Service", "Something went wrong.", "danger");
            });
        },
        destroyService(context, { vm, id }) {
            axios.post("/billed-services/" + id, {
                _method: "delete"
            }).then(function (response) {
                // Si la respuesta tuvo el codigo 204
                if (response.status == 204) {
                    context.commit("REMOVE_SERVICE", id);
                    vm.makeToast("Service", "Service has been removed.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Billed Service", "Something went wrong.", "danger");
            });
        },
    }
})
