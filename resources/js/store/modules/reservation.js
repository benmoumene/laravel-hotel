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
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
            state.ready = true;
        },
        ADD_RESERVATION(state, reservation) {
            Vue.set(state.reservations, reservation.id, reservation);
        },
        UPDATE_RESERVATION(state, reservation) {
            //state.reservations.push(reservation);
            Vue.set(state.reservations, reservation.id, reservation);
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
                // Objeto recibido
                let newReservation = response.data.reservation;
                let newGuest = response.data.guest;
                let newInvoice = response.data.invoice;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newReservation.hasOwnProperty("id")) {
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
                // Objeto recibido
                let newReservation = response.data.reservation;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newReservation.hasOwnProperty("id")) {
                    context.commit("UPDATE_RESERVATION", newReservation);
                    vm.makeToast("Reservation", "Reservation cancelled.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Reservation", "Something went wrong.", "danger");
            });
        },
    }
})
