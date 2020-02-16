
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
        storeRoom(context, { vm, room }) {
            axios.post("/rooms/", {
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
            }).catch(function (error) {
                vm.makeToast("Room", error.response.data.message, "danger");
            });
        },
        updateRoom(context, { vm, room }) {
            axios.post("/rooms/" + room.id, {
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
            }).catch(function (error) {
                vm.makeToast("Room", error.response.data.message, "danger");
            });
        },
    }
})
