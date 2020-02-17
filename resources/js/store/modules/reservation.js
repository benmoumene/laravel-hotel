export default ({
    namespaced: true,
    state: {
        reservations: {},
        ready: false
    },
    getters: {
        getReservation: (state, getters) => (reservationId) => {
            return state.reservations[reservationId];
        },
        getReservations: (state, getters) => {
            return Object.keys(state.reservations).map(
                id => state.reservations[id]
            );
        },
        getCustomerReservations: (state, getters) => (customerId) => {
            return getters.getReservations.filter(
                reservation => reservation.customer_id === customerId
            );
        },
    },
    mutations: {
        SET_RESERVATION(state, reservation) {
            state.reservation = reservation;
        },
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
            state.ready = true;
        },
        ADD_RESERVATION(state, reservation) {
            //state.reservations.push(reservation);
            Vue.set(state.reservations, reservation.id, reservation);
        },
        UPDATE_RESERVATION(state, reservation) {
            //state.reservations.push(reservation);
            Vue.set(state.reservations, reservation.id, reservation);
        },
        DELETE_RESERVATION(state, id) {
            //Vue.delete(state.reservations, index);
            Vue.delete(state.reservations, id);
        },
    },
    actions: {
        updateReservation(context, newReservation) {
            context.commit("UPDATE_RESERVATION", newReservation);
        },
        storeReservation(context, { vm, reservation }) {
            axios.post("/reservations/", {
                reservation
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response["data"].length == 0) {
                        return;
                    }
                    let newGuest = response["data"]["guest"];
                    let newReservation = response["data"]["reservation"];
                    let newInvoice = response.data.invoice;
                    // Comprobar si reservation lleva reservation.guest
                    context.commit("ADD_RESERVATION", newReservation);
                    vm.$store.commit("guest/ADD_GUEST", newGuest)
                    vm.$store.commit("invoice/ADD_INVOICE", newInvoice)
                    vm.makeToast("Reservation", "Reservation created.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Reservation", error.response.data.message, "danger");
            });
        },
        cancel(context, { vm, reservation }) {
            axios.get("/reservations/" + reservation.id + "/cancel", {
                reservation,
            }).then(function (response) {
                let newReservation = response["data"]["reservation"];
                context.commit("UPDATE_RESERVATION", newReservation);
                vm.makeToast("Reservation", "Reservation cancelled.", "success");
            }).catch(function (error) {
                vm.makeToast("Reservation", "Something went wrong.", "danger");
            });
        },
    }
})
