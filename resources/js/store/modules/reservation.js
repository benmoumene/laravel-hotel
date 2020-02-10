export default ({
    namespaced: true,
    state: {
        reservations: [],
        ready: false
    },
    getters: {
        getReservation: (state, getters) => (reservationId) => {
            return getters.getReservationById(reservationId);
        },
        getReservationById: (state, getters) => (reservationId) => {
            return state.reservations.find(
                reservation => reservation.id === reservationId
            );
        },
        getReservationIndex: (state, getters) => (reservationId) => {
            return state.reservations.findIndex(
                reservation => reservation.id === reservationId);
        },
        getCustomerReservations: (state, getters) => (customerId) => {
            return state.reservations.filter(
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
            state.reservations.push(reservation);
        },
        DELETE_RESERVATION(state, index) {
            Vue.delete(state.reservations, index);
        },
        REPLACE_RESERVATION(state, { reservationIndex, newReservation }) {
            Vue.set(state.reservations, reservationIndex, newReservation);
        },
    },
    actions: {
        updateReservation(context, { reservation, reservationId }) {
            var index = context.state.reservations.findIndex(
                reservation => reservation.id === reservationId);
            context.commit("REPLACE_RESERVATION", {
                reservationIndex: index,
                newReservation: reservation
            });
        },
        addReservation(context, { vm, reservation }) {
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
                    // Comprobar si reservation lleva reservation.guest
                    context.commit("ADD_RESERVATION", newReservation);
                    vm.$store.commit("guest/ADD_GUEST", newGuest)
                    vm.makeToast("Reservation", "Reservation created.", "success");
                }
            }).catch(function (response) {
                vm.makeToast("Reservation", "Something went wrong.", "danger");
            });
        },
        cancel(context, { vm, reservation }) {
            axios.get("/reservation/" + reservation.id + "/cancel", {
                reservation,
            }).then(function (response) {
                let newReservation = response["data"]["reservation"];
                let reservationIndex = context.getters.getReservationIndex(reservation.id);
                context.commit("REPLACE_RESERVATION", { reservationIndex, newReservation });
                vm.makeToast("Reservation", "Reservation cancelled.", "success");
            }).catch(function (response) {
                vm.makeToast("Reservation", "Something went wrong.", "danger");
            });
        },
    }
})
