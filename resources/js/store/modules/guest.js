
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
                    if (guest.customer_id !== customerId) {
                        return false;
                    }

                    if (guest.check_out === null) {
                        if (guest.customer_id === customerId &&
                            datetime >= guest.check_in) {
                            return true;
                        }
                    } else {
                        if (guest.customer_id === customerId &&
                            datetime >= guest.check_in &&
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
    },
    actions: {
        addGuest(context, { vm, room }) {
            axios.post("http://127.0.0.1:8000/room/", {
                room
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newGuest = response['data']['guest'];
                    context.commit('ADD_GUEST', newGuest);
                    //vm.makeToast("Room added", newGuest.name + ' added.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The room cannot be added!!!', 'danger');
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
