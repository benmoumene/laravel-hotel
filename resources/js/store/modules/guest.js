
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
        getGuestWithCustomerId: (state, getters) => (customerId) => {
            return getters.getGuests.find(
                guest => guest.customer.id === customerId
            );
        },
        getGuestWithReservationId: (state, getters) => (reservationId) => {
            return getters.getGuests.find(
                guest => guest.reservation_id === reservationId
            );
        },
        isCurrentGuest: (state, getters) => (customerId) => {
            // Si check_in != null && check_out == null
            // Buscar reserva
            // si reserva == 'active' es current guest
            let guest = getters.getGuestWithCustomerId(customerId);

            if (typeof guest === 'undefined') {
                return false;
            }

            if (guest.check_in !== null && guest.check_out === null) {
                return true;
            }

            return false;
        },
        isCurrentGuestasdasd: (state, getters) => (customerId) => {
            // Si check_in != null && check_out == null
            // Buscar reserva
            // si reserva == 'active' es current guest
            var now = new Date();
            var dd = String(now.getDate()).padStart(2, "0");
            var mm = String(now.getMonth() + 1).padStart(2, "0");
            var yyyy = now.getFullYear();
            var hour = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();

            var date = yyyy + "-" + mm + "-" + dd;
            var time = hour + ":" + minutes + ":" + seconds;
            //2020-01-13 19:59:12
            var datetime = date + " " + time;

            var rows = getters.getGuests.filter(
                function (guest) {
                    if (guest.customer.id !== customerId) {
                        return false;
                    }

                    if (guest.check_out === null) {
                        if (datetime >= guest.check_in) {
                            return true;
                        }
                    } else {
                        if (datetime >= guest.check_in &&
                            datetime <= guest.check_out) {
                            return true;
                        }
                    }
                    return false;
                }
            );

            if (rows.length == 0) {
                return false;
            }

            return true;
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
                    vm.$store.dispatch("reservation/updateStatus", {
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
