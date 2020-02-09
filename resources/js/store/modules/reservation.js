export default ({
    namespaced: true,
    state: {
        reservations: [],
        ready: false
    },
    getters: {
        getReservationById: (state, getters) => (reservationId) => {
            return state.reservations.find(
                reservation => reservation.id === reservationId
            );
        },
        getReservation: (state, getters) => (reservationId) => {
            return state.reservations.find(
                reservation => reservation.id === reservationId
            );
        },
        getCustomerReservations: (state, getters) => (customerId) => {
            return state.reservations.filter(
                reservation => reservation.customer_id === customerId
            );
        },
    },
    mutations: {
        SET_READY(state, ready) {
            state.ready = true;
        },
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
        }
    },
    actions: {
        deleteReservationById(context, reservationId) {
            var index = context.state.reservations.findIndex(
                reservation => reservation.id === reservationId);
            context.commit('DELETE_RESERVATION', index);
        },
        addReservation(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/", {
                reservation
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newReservation = response['data']['reservation'];
                    context.commit('ADD_RESERVATION', newReservation);
                    vm.makeToast("Reservation created.", 'success');
                }
            }).catch(function (response) {
                console.log(response);
                vm.makeToast("Error", 'Reservation failed!!!', 'danger');
            });
        },
        cancelReservation(context, { vm, reservation }) {
            axios.get("/reservation/" + reservation.id + '/cancel', {
                reservation,
            }).then(function (response) {
                reservation.status = response['data']['reservation'].status;
                vm.makeToast("Success", 'Reservation cancelled!!!', 'success');
            }).catch(function (response) {
                vm.makeToast("Error", 'Cancellation failed!!!', 'danger');
            });
        },
        deleteReservation(context, { vm, reservation }) {
            axios.post("/reservations/" + reservation.id, {
                reservation,
                _method: "delete"
            }).then(function (response) {
                vm.makeToast("Success", 'Reservation cancelled!!!', 'success');
                // Borrar reserva
                context.dispatch('deleteReservationById', reservation.id);
            }).catch(function (response) {
                vm.makeToast("Error", 'Cancellation failed!!!', 'danger');
            });
        },
    }
})
