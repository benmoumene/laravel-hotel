export default ({
    namespaced: true,
    state: {
        invoices: {},
    },
    getters: {
        getInvoices: (state) => {
            return Object.keys(state.invoices).map(
                id => state.invoices[id]
            );
        },
        getInvoiceFromReservation: (state, getters) => (reservationId) => {
            return getters.getInvoices.find(
                invoice => invoice.reservation_id === reservationId
            );
        },
        getInvoice: (state, getters) => (invoiceId) => {
            return state.invoices[invoiceId];
        },
        getCustomerInvoices: (state, getters, rootState, rootGetters) => (customerId) => {
            // Buscamos todas las reservas asociadas al cliente.
            let customerReservations = rootGetters['reservation/getCustomerReservations'](customerId);

            let customerInvoices = customerReservations.map(
                reservation => getters.getInvoiceFromReservation(reservation.id)
            );

            return customerInvoices;
        },
        hasPendingInvoices: (state, getters) => (customerId) => {
            let customerInvoices = getters.getCustomerInvoices(customerId);

            let invoices = customerInvoices.filter(
                invoice => invoice.status === 'pending'
            );

            if (invoices.length >= 1) {
                return true;
            }
            return false;
        },
        countPendingInvoices: (state, getters) => {
            return getters.getInvoices.filter(
                invoice => invoice.status === 'pending'
            ).length;
        },
    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
        },
        ADD_INVOICE(state, invoice) {
            Vue.set(state.invoices, invoice.id, invoice);
        },
        UPDATE_INVOICE(state, invoice) {
            //state.invoices[invoice.id].total = invoice.total;
            Vue.set(state.invoices, invoice.id, invoice);
        },
    },
    actions: {
        updateInvoice(context, newInvoice) {
            context.commit("UPDATE_INVOICE", newInvoice);
        },
        generateInvoice(context, { vm, reservation }) {
            //axios.post("/invoices/" + reservation.id, {
            axios.post("/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (error) {
                vm.makeToast("Invoice", "Something went wrong.", "danger");
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        payInvoice(context, { vm, invoice }) {
            axios.post("/invoices/" + invoice.id, {
                invoice,
                _method: "put"
            }).then(function (response) {
                let newInvoice = response["data"]["invoice"];
                context.commit("UPDATE_INVOICE", newInvoice);
                vm.makeToast("Invoice updated", 'The invoice has been paid.', 'success');
            }).catch(function (error) {
                vm.makeToast("Invoice", "Something went wrong.", "danger");
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        recalculateInvoice(context, { vm, invoice }) {
            axios.post("/invoices/" + invoice.id + '/recalc', {
                invoice,
                _method: "post"
            }).then(function (response) {
                let newInvoice = response["data"]["invoice"];
                context.commit("UPDATE_INVOICE", newInvoice);
                vm.makeToast("Invoice updated", 'The invoice has been updated.', 'success');
            }).catch(function (error) {
                vm.makeToast("Invoice", "Something went wrong.", "danger");
            });
        },
    }
})
