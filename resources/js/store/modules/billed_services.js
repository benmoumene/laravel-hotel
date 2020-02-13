
export default ({
    namespaced: true,
    state: {
        billedServices: [],
    },
    getters: {
        getBilledServices: (state, getters) => (reservationId) => {
            return state.billedServices.filter(service =>
                service.reservation_id === reservationId
            );
        },
        getBilledServiceIndex: (state, getters) => (serviceId) => {
            return state.billedServices.findIndex(
                service => service.id === serviceId
            );
        },
    },
    mutations: {
        SET_BILLED_SERVICES(state, billed_services) {
            state.billedServices = billed_services;
        },
        REMOVE_SERVICE(state, index) {
            Vue.delete(state.billedServices, index);
        },
    },
    actions: {
        add(context, { vm, serviceId, reservationId }) {
            axios.post("/billed_service/", {
                billed_service: {
                    service_id: serviceId,
                    reservation_id: reservationId
                }
            }).then(function (response) {
                // commit    
                vm.makeToast("Success", "Billed service has been add.", 'success');
            }).catch(function (response) {
                vm.makeToast("Error", "Something went wrong.", 'danger');
            });
        },
        deleteBilledService(context, { vm, id }) {
            axios.post("http://127.0.0.1:8000/billed_service/" + id, {
                _method: "delete"
            }).then(function (response) {
                var index = context.getters.getBilledServiceIndex(id);
                vm.makeToast("Billed service has been removed.", 'success');
                context.commit('REMOVE_SERVICE', index);
            }).catch(function (response) {
                vm.makeToast("Billed service cannot be removed.", 'danger');
            });
        },
    }
})
