
export default ({
    namespaced: true,
    state: {
        rooms: {},
    },
    getters: {
        getRoom: (state, getters) => (roomId) => {
            return state.rooms[roomId];
        },
        getRoomName: (state, getters) => (roomId) => {
            return getters.getRoom(roomId).name;
        },
        getRooms: (state) => {
            return Object.keys(state.rooms).map(
                id => state.rooms[id]
            );
        },
    },
    mutations: {
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        ADD_ROOM(state, room) {
            //state.rooms.push(room);
            Vue.set(state.rooms, room.id, room);
        },
        UPDATE_ROOM(state, room) {
            Vue.set(state.rooms, room.id, room);
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
                vm.makeToast("Room", "Something went wrong.", "danger");
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

                    let newRoom = response.data.room;
                    context.commit("UPDATE_ROOM", newRoom);
                    vm.makeToast("Room updated", 'The room ' + room.name
                        + ' has been updated.', 'success');
                }
            }).catch(function (error) {
                vm.makeToast("Room", "Something went wrong.", "danger");
            });
        },
    }
})
