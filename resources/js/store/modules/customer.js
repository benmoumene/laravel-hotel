export default ({
    namespaced: true,
    state: {
        customers: {},
    },
    getters: {
        getCustomer: (state) => (customerId) => {
            return state.customers[customerId];
        },
        getCustomers: (state) => {
            return Object.keys(state.customers).map(
                id => state.customers[id]
            );
        },
    },
    mutations: {
        SET_CUSTOMERS(state, customers) {
            state.customers = customers;
        },
        ADD_CUSTOMER(state, customer) {
            //state.customers.push(customer);
            Vue.set(state.customers, customer.id, customer);
        },
        UPDATE_CUSTOMER(state, customer) {
            Vue.set(state.customers, customer.id, customer);
        },
    },
    actions: {
        storeCustomer(context, { vm, customer }) {
            axios.post("/customers/", {
                customer
            }).then(function (response) {
                // Objeto recibido
                let newCustomer = response.data.customer;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newCustomer.hasOwnProperty("id")) {
                    context.commit("ADD_CUSTOMER", newCustomer);
                    vm.makeToast(
                        'Customers',
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
                // Objeto recibido
                let newCustomer = response.data.customer;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newCustomer.hasOwnProperty("id")) {
                    context.commit("UPDATE_CUSTOMER", newCustomer);
                    vm.makeToast(
                        'Customers',
                        'The customer ' + newCustomer.first_name + ' has been updated.',
                        'success'
                    );
                }
            }).catch(function (error) {
                vm.makeToast("Customer", "Something went wrong.", "danger");
            });
        },
    }
})
