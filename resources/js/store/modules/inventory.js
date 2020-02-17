export default ({
    namespaced: true,
    state: {
        items: {},
    },
    getters: {
        getItems: (state) => {
            return Object.keys(state.items).map(
                id => state.items[id]
            );
        },
    },
    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        },
        ADD_ITEM(state, item) {
            //state.items.push(item);
            //state.items[item.id] = item;
            Vue.set(state.items, item.id, item);
        },
        UPDATE_ITEM(state, item) {
            Vue.set(state.items, item.id, item);
        },
    },
    actions: {
        storeItem(context, { vm, item }) {
            axios.post("/inventory-items/", {
                item
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response.data.length == 0) {
                        return;
                    }

                    let newItem = response.data.item;
                    context.commit('ADD_ITEM', newItem);
                    vm.makeToast("Item ", newItem.name + ' added.', 'success');
                }
            }).catch(function (error) {
                vm.makeToast("Inventory", "Something went wrong.", "danger");
            });
        },
        updateItem(context, { vm, item }) {
            axios.post("/inventory-items/" + item.id, {
                item,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response.data.length == 0) {
                        return;
                    }

                    let newItem = response.data.item;
                    context.commit("UPDATE_ITEM", newItem);
                    vm.makeToast("Item ", item.name + ' update.', 'success');
                }
            }).catch(function (error) {
                vm.makeToast("Inventory", "Something went wrong.", "danger");
            });
        },
    }
})
