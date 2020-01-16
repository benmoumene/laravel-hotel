export default ({
    namespaced: true,
    state: {
        invoices: [],
    },
    getters: {

    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
        },
    },
    actions: {
        editInvoice(context, { vm, reservation }) {
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
    }
})
