export default ({
    namespaced: true,
    state: {
        reservation: [],
    },
    getters: {

    },
    mutations: {
        SET_RESERVATIONS(state, reservations) {
            state.reservations = reservations;
        },
        ADD_RESERVATION(state, reservation) {
            state.reservation.push(reservation);
        },
    },
    actions: {
        addReservation(context, reservation) {
            axios.post("http://127.0.0.1:8000/reservations/", {
                reservation
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newReservation = response['data']['reservation'];
                    context.commit('ADD_RESERVATION', newReservation);
                }
            });
        },
        deleteReservation(context, reservation) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "delete"
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
