
export default ({
    namespaced: true,
    state: {
        guests: {},
    },
    getters: {
        getGuest: (state) => (guestId) => {
            return state.guests[guestId];
        },
        getGuests: (state) => {
            return Object.keys(state.guests).map(
                id => state.guests[id]
            );
        },
        getGuestWithReservationId: (state, getters) => (reservationId) => {
            return getters.getGuests.find(
                guest => guest.reservation_id === reservationId
            );
        },
        isCurrentGuest: (state, getters, rootState, rootGetters) => (customerId) => {
            // Buscamos todas las reservas asociadas al cliente.
            let customerReservations = rootGetters['reservation/getCustomerReservations'](customerId);

            // Para cada reserva comprobamos que esten activas, que tenga fecha de entrada
            // pero no tenga fecha de salida.
            let rows = customerReservations.filter(function (reservation) {
                let guest = getters.getGuestWithReservationId(reservation.id);
                return guest.check_in !== null && guest.check_out === null && reservation.status === "active";
            });

            if (rows.length > 0) {
                return true;
            }
            return false;
        },
    },
    mutations: {
        SET_GUESTS(state, guests) {
            state.guests = guests;
        },
        SET_CHECK_IN(state, { guestIndex, checkIn }) {
            //state.guests[guestIndex].check_in = checkIn;
            Vue.set(state.guests[guestIndex], 'check_in', checkIn);
        },
        SET_CHECK_OUT(state, { guestIndex, checkOut }) {
            //state.guests[guestIndex].check_out = checkOut;
            Vue.set(state.guests[guestIndex], 'check_out', checkOut);
        },
        ADD_GUEST(state, guest) {
            Vue.set(state.guests, guest.id, guest);
        },
        UPDATE_GUEST(state, guest) {
            Vue.set(state.guests, guest.id, guest);
        },
    },
    actions: {
        checkIn(context, { vm, reservation }) {
            axios.post("/guests/" + reservation.guest.id + "/checkin", {
                guest: reservation.guest,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Comprobamos que json en el objeto
                    if (response["data"].length == 0) {
                        return;
                    }
                    // Nuevos datos del guest
                    let newGuest = response.data.guest;

                    // Llevamos a cabo la modificacion
                    context.commit("UPDATE_GUEST", newGuest);

                    // Mostramos un mensaje
                    vm.makeToast("Check In", "Guest check in " + newGuest.check_in, "success");
                }
            }).catch(function (error) {
                vm.makeToast("Guest", "Something went wrong.", "danger");
            });
        },
        checkOut(context, { vm, reservation }) {
            axios.post("/guests/" + reservation.guest.id + "/checkout", {
                guest: reservation.guest,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Comprobamos que json en el objeto
                    if (response["data"].length == 0) {
                        return;
                    }

                    // Nuevos datos del guest
                    let newGuest = response.data.guest;
                    // Llevamos a cabo la modificacion
                    context.commit("UPDATE_GUEST", newGuest);

                    let newReservation = response["data"]["reservation"];
                    vm.$store.dispatch("reservation/updateReservation", {
                        reservationId: newReservation.id,
                        newStatus: newReservation.status
                    });

                    let newInvoice = response["data"]["invoice"];
                    vm.$store.dispatch("invoice/updateInvoice", newInvoice);

                    // Mostramos un mensaje
                    vm.makeToast("Check Out", "Guest check out " + newGuest.check_out, "success");
                }
            }).catch(function (error) {
                vm.makeToast("Guest", "Something went wrong.", "danger");
            });
        },
    }
})
