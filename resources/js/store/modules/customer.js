export default ({
    namespaced: true,
    state: {
        customers: [],
    },
    getters: {
        getCustomerById: (state, getters) => (customerId) => {
            return state.customers.find(
                customer => customer.id === customerId
            );
        },
        getCustomer: (state, getters) => (customerId) => {
            return state.customers.find(
                customer => customer.id === customerId
            );
        },
    },
    mutations: {
        SET_CUSTOMERS(state, customers) {
            state.customers = customers;
        },
        ADD_CUSTOMER(state, customer) {
            state.customers.push(customer);
        },
    },
    actions: {
        storeCustomer(context, { vm, customer }) {
            axios.post("/customers/", {
                customer
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newCustomer = response['data']['customer'];
                    context.commit('ADD_CUSTOMER', newCustomer);

                    vm.makeToast(
                        'Customer added',
                        'The customer ' + newCustomer.first_name + ' has been added.',
                        'success'
                    );
                }
            }).catch(function (error) {
                vm.makeToast("Customer", "Something went wrong.", "danger");
            });
        },
        updateCustomer(context, { vm, customer }) {
            axios.post("/customers/" + customer.id, {
                customer,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }
                    vm.makeToast(
                        'Customer updated',
                        'The customer ' + customer.first_name + ' has been updated.',
                        'success'
                    );
                }
            }).catch(function (error) {
                vm.makeToast("Customer", "Something went wrong.", "danger");
            });
        },
    }
})
