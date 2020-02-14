
export default ({
    namespaced: true,
    state: {
        guests: [],
    },
    getters: {
        getGuest: (state, getters) => (customerId) => {
            return getters.getGuestById(customerId);
        },
        getGuestWithCustomerId: (state, getters) => (customerId) => {
            return state.guests.find(
                guest => guest.customer.id === customerId
            );
        },
        getGuestIndex: (state, getters) => (guestId) => {
            return state.guests.findIndex(
                guest => guest.id === guestId);
        },
        getGuestWithReservationId: (state, getters) => (reservationId) => {
            return state.guests.find(
                guest => guest.reservation_id === reservationId
            );
        },
        getGuestById: (state, getters) => (guestId) => {
            return state.guests.find(guest => guest.id === guestId);
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

            var rows = state.guests.filter(
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
            state.guests.push(guest);
        },
        REPLACE_GUEST(state, { guestIndex, newGuest }) {
            Vue.set(state.guests, guestIndex, newGuest);
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
                    let checkIn = response["data"]["guest"]['check_in'];

                    // Buscamos el index del guest
                    let guestIndex = context.getters.getGuestIndex(reservation.guest.id);

                    // Llevamos a cabo la modificacion
                    context.commit("SET_CHECK_IN", { guestIndex, checkIn });

                    // Mostramos un mensaje
                    vm.makeToast("Check In", "Guest check in " + checkIn, "success");
                }
            }).catch(function (response) {
                vm.makeToast("Check In", "Something went wrong.", "danger");
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
                    let checkOut = response["data"]["guest"]['check_out'];
                    let newReservation = response["data"]["reservation"];

                    // Buscamos el index del guest
                    let guestIndex = context.getters.getGuestIndex(reservation.guest.id);
                    // Llevamos a cabo la modificacion
                    context.commit("SET_CHECK_OUT", { guestIndex, checkOut });

                    vm.$store.dispatch("reservation/updateStatus", {
                        reservationId: newReservation.id,
                        newStatus: newReservation.status
                    });

                    let newInvoice = response["data"]["invoice"];
                    vm.$store.dispatch("billing/replaceInvoiceById", {
                        invoiceId: newInvoice.id,
                        newInvoice
                    });

                    // Mostramos un mensaje
                    vm.makeToast("Check Out", "Guest check out " + checkOut, "success");
                }
            }).catch(function (response) {
                vm.makeToast("Check Out", "Something went wrong.", "danger");
            });
        },
    }
})
