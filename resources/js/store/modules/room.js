
export default ({
    namespaced: true,
    state: {
        rooms: [],
    },
    getters: {
        getRoomById: (state, getters) => (roomId) => {
            return state.rooms.find(room => room.id === roomId);
        },
        getRoom: (state, getters) => (roomId) => {
            return state.rooms.find(room => room.id === roomId);
        },
        getRoomName: (state, getters) => (roomId) => {
            return state.rooms.find(room => room.id === roomId).name;
        },
    },
    mutations: {
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        ADD_ROOM(state, room) {
            state.rooms.push(room);
        },
    },
    actions: {
        addRoom(context, { vm, room }) {
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
                    vm.makeToast("Room ", newRoom.name + ' has been added.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The room' + room.name + 'cannot be added!', 'danger');
            });
        },
        editRoom(context, { vm, room }) {
            axios.post("http://127.0.0.1:8000/room/" + room.id, {
                room,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    vm.makeToast("Room updated", 'The room ' + room.name
                        + ' has been updated.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The room cannot be updated!', 'danger');
            });
        },
    }
})
