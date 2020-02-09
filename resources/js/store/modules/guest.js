
export default ({
    namespaced: true,
    state: {
        guests: [],
    },
    getters: {
        getGuest: (state, getters) => (customerId) => {
            return state.guests.find(
                guest => guest.customer_id === customerId
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
        ADD_GUEST(state, guest) {
            state.guests.push(guest);
        },
        REPLACE_GUEST(state, { guestIndex, newGuest }) {
            Vue.set(state.guests, guestIndex, newGuest);
        },
    },
    actions: {
        checkIn(context, { vm, reservation }) {
            axios.post("/guest/" + reservation.guest.id + "/checkin", {
                guest: reservation.guest,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Comprobamos que json en el objeto
                    if (response["data"].length == 0) {
                        return;
                    }

                    // Nuevos datos del guest
                    var newGuest = response["data"]["guest"];

                    // Buscamos el index del guest
                    let guestIndex = context.getters.getGuestIndex(reservation.guest.id);

                    // Llevamos a cabo la modificacion
                    context.commit("REPLACE_GUEST", { guestIndex, newGuest });

                    // Mostramos un mensaje
                    vm.makeToast("Check In", "Guest check in " + newGuest.check_in, "success");
                }
            }).catch(function (response) {
                vm.makeToast("Check In", "Something went wrong.", "danger");
            });
        },
        checkOut(context, { vm, reservation }) {
            axios.post("/guest/" + reservation.guest.id + "/checkout", {
                guest: reservation.guest,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Comprobamos que json en el objeto
                    if (response["data"].length == 0) {
                        return;
                    }

                    // Nuevos datos del guest
                    var newGuest = response["data"]["guest"];
                    var newReservation = response["data"]["reservation"];

                    // Buscamos el index del guest
                    let guestIndex = context.getters.getGuestIndex(reservation.guest.id);
                    // Llevamos a cabo la modificacion
                    context.commit("REPLACE_GUEST", { guestIndex, newGuest });
                    vm.$store.dispatch("reservation/updateReservation", {
                        reservation: newReservation,
                        reservationId: newReservation.id
                    });

                    // Mostramos un mensaje
                    vm.makeToast("Check Out", "Guest check out " + newGuest.check_out, "success");
                }
            }).catch(function (response) {
                vm.makeToast("Check Out", "Something went wrong.", "danger");
            });
        },
    }
})
