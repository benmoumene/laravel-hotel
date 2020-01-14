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
        addInventoryItem(context, item) {
            axios.post("http://127.0.0.1:8000/inventory/", {
                item
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response['data'].length == 0) {
                        return;
                    }

                    var newItem = response['data']['item'];
                    context.commit('ADD_INVENTORY_ITEM', newItem);
                }
            });
        },
        editInventoryItem(context, item) {
            axios.post("http://127.0.0.1:8000/inventory/" + item.id, {
                item,
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
