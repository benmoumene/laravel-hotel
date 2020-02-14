export default ({
    namespaced: true,
    state: {
        items: [],
    },
    getters: {

    },
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
        ADD_ITEM(state, item) {
            state.items.push(item);
        },
    },
    actions: {
        addItem(context, { vm, item }) {
            axios.post("/inventory-items/", {
                item
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newItem = response['data']['item'];
                    context.commit('ADD_ITEM', newItem);
                    vm.makeToast("Item ", newItem.name + ' added.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The item cannot be added!!!', 'danger');
            });
        },
        editItem(context, { vm, item }) {
            axios.post("/inventory-items/" + item.id, {
                item,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var item = response['data']['item'];
                    vm.makeToast("Item ", item.name + ' update.', 'success');
                }
            }).catch(function (response) {
                vm.makeToast("Error", 'The item cannot be updated!!!', 'danger');
            });
        },
    }
})
