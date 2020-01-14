export default ({
    namespaced: true,
    state: {
        customers: [],
    },
    getters: {
        getCustomerById: (state, getters) => (customerId) => {
            return state.customers.find(customer => customer.id === customerId);
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
        addCustomer(context, customer) {
            axios.post("http://127.0.0.1:8000/customers/", {
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
                }
            });
        },
        editCustomer(context, customer) {
            axios.post("http://127.0.0.1:8000/customers/" + customer.id, {
                customer,
                _method: "put"
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
