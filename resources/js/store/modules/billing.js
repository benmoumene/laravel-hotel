export default ({
    namespaced: true,
    state: {
        invoices: [],
    },
    getters: {
        getInvoiceById: (state, getters) => (invoiceId) => {
            return state.invoices.find(invoice => invoice.id === invoiceId);
        },
        getCustomerInvoices: (state, getters) => (customerId) => {
            return state.invoices.filter(
                invoice => invoice.guest.customer.id === customerId
            );
        },
        hasPendingInvoices: (state, getters) => (customerId) => {
            var invoices = state.invoices.filter(
                invoice => invoice.guest.customer.id === customerId
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
            axios.post("http://127.0.0.1:8000/reservations/" + reservation.id, {
                reservation,
                _method: "put"
            }).then(function (response) {
            }).catch(function (response) {
            });
        },
        // Marca una factura como pagada. (Status/Payment Method)
        updateInvoice(context, { vm, invoice }) {
            axios.post("http://127.0.0.1:8000/invoice/" + invoice.id, {
                invoice,
                _method: "put"
            }).then(function (response) {
                vm.makeToast("Invoice ", invoice.id + ' has been updated.', 'success');
            }).catch(function (response) {
                vm.makeToast("Invoice ", invoice.id + ' cannot be updated', 'danger');
            });
        },
    }
})
