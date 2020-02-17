
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
            //state.billedServices.push(service);
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
                let service = response["data"]["service"];
                context.commit("ADD_SERVICE", service);
                vm.makeToast("Success", "Billed service has been add.", 'success');
            }).catch(function (error) {
                vm.makeToast("Billed Service", "Something went wrong.", "danger");
            });
        },
        destroyService(context, { vm, id }) {
            axios.post("/billed-services/" + id, {
                _method: "delete"
            }).then(function (response) {
                vm.makeToast("Billed service has been removed.", 'success');
                context.commit('REMOVE_SERVICE', id);
            }).catch(function (error) {
                vm.makeToast("Billed Service", "Something went wrong.", "danger");
            });
        },
    }
})
