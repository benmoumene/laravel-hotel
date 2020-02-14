export default ({
    namespaced: true,
    state: {
        invoices: [],
    },
    getters: {
        getInvoiceById: (state, getters) => (invoiceId) => {
            return state.invoices.find(invoice => invoice.id === invoiceId);
        },
        getInvoiceFromReservation: (state, getters) => (reservationId) => {
            return state.invoices.find(
                invoice => invoice.reservation_id === reservationId
            );
        },
        getInvoice: (state, getters) => (invoiceId) => {
            return getters.getInvoiceById(invoiceId);
        },
        getCustomerInvoices: (state, getters) => (customerId) => {
            return state.invoices.filter(
                invoice => invoice.customer.id === customerId
            );
        },
        hasPendingInvoices: (state, getters) => (customerId) => {
            let invoices = state.invoices.filter(
                invoice => invoice.customer.id === customerId
                    && invoice.status === 'pending'
            );

            if (invoices.length >= 1) {
                return true;
            }
            return false;
        },
        countPendingInvoices: (state, getters) => {
            return state.invoices.filter(
                invoice => invoice.status === 'pending'
            ).length;
        },
    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
        },
        ADD_INVOICE(state, invoice) {

        },
        SET_INVOICE(state, invoice) {

        }
    },
    actions: {
        generateInvoice(context, { vm, reservation }) {
            //axios.post("/invoices/" + reservation.id, {
            axios.post("/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        payInvoice(context, { vm, invoice }) {
            axios.post("/invoices/" + invoice.id + "/pay", {
                invoice,
                _method: "put"
            }).then(function (response) {
                vm.makeToast("Invoice updated", 'The invoice has been paid.', 'success');
            }).catch(function (response) {
                vm.makeToast("Invoice update error", ' The invoice cannot be paid', 'danger');
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        recalculateInvoice(context, { vm, invoice }) {
            axios.post("/invoices/" + invoice.id + '/recalc', {
                invoice,
                _method: "post"
            }).then(function (response) {
                let newInvoice = response["data"]["invoice"];
                invoice.total = newInvoice.total;
                vm.makeToast("Invoice updated", 'The invoice has been updated.', 'success');
            }).catch(function (response) {
                vm.makeToast("Invoice update error", ' The invoice cannot be updated', 'danger');
            });
        },
    }
})
