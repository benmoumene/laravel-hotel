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
                // Objeto recibido
                let newItem = response.data.item;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newItem.hasOwnProperty("id")) {
                    context.commit("ADD_ITEM", newItem);
                    vm.makeToast("Inventory", newItem.name + " has been added.", "success");
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
                // Objeto recibido
                let newItem = response.data.item;

                // Si la respuesta tuvo el codigo 200 y el objeto tiene id
                // Asumimos que es un objeto valido
                if (response.status == 200 && newItem.hasOwnProperty("id")) {
                    context.commit("UPDATE_ITEM", newItem);
                    vm.makeToast("Inventory", newItem.name + " has been updated.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Inventory", "Something went wrong.", "danger");
            });
        },
    }
})
