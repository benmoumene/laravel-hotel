
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
            var dd = String(now.getDate()).padStart(2, '0');
            var mm = String(now.getMonth() + 1).padStart(2, '0');
            var yyyy = now.getFullYear();
            var hour = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();

            var date = yyyy + '-' + mm + '-' + dd;
            var time = hour + ':' + minutes + ':' + seconds;
            //2020-01-13 19:59:12
            var datetime = date + ' ' + time;

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
        guestCheckIn(context, { vm, reservation }) {
            axios.post("/guest/" + reservation.id + "/checkin", {
                reservation,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    var newGuest = response['data']['guest'];

                    // Nuevo guest
                    if (reservation.guest === null) {
                        context.commit('ADD_GUEST', newGuest);
                    } else {
                        // Edit guest
                        let guestIndex = context.getters.getGuestIndex(reservation.guest.id);
                        context.commit('REPLACE_GUEST', { guestIndex, newGuest });
                        // Agregar ids a reservations
                    }

                    vm.makeToast("Arrival", 'Guest arrival set at ' + newGuest.check_in, 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'Guest cannot be added', 'danger');
            });
        },
        guestCheckOut(context, { vm, reservation }) {
            axios.post("/guest/" + reservation.id + "/checkout", {
                reservation,
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    var newGuest = response['data']['guest'];
                    var newReservation = response['data']['reservation'];

                    // Nuevo guest
                    if (reservation.guest !== null) {
                        // Edit guest
                        let guestIndex = context.getters.getGuestIndex(reservation.guest.id);
                        context.commit('REPLACE_GUEST', { guestIndex, newGuest });
                        vm.$store.dispatch('reservation/updateReservation', {
                            reservation: newReservation,
                            reservationId: newReservation.id
                        });
                        // Agregar ids a reservations
                    }

                    vm.makeToast("Check out", 'Guest left at ' + newGuest.check_in, 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Check out", 'Check out cannot be changed.', 'danger');
            });
        },
        editGuest(context, guest) {
            axios.post("http://127.0.0.1:8000/guest/", {
                guest,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    // console.log('success');
                }
            });
        },
    }
})
