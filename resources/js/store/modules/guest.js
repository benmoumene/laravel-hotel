
export default ({
    namespaced: true,
    state: {
        guests: [],
    },
    getters: {
        getGuestById: (state, getters) => (guestId) => {
            return state.guests.find(guest => guest.id === guestId);
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

                    var newRoom = response['data']['room'];
                    context.commit('ADD_ROOM', newRoom);
                    vm.makeToast("Room added", newRoom.name + ' added.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The room cannot be added!!!', 'danger');
            });
        },
    }
})
