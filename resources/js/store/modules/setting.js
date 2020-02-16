
export default ({
    namespaced: true,
    state: {
        settings: [],
    },
    getters: {
        getSettingValue: (state, getters) => (name) => {
            var setting = state.settings.find(setting => setting.name === name);
            if (typeof setting !== "undefined") {
                return setting.value;
            }
        },
    },
    mutations: {
        SET_SETTINGS(state, settings) {
            state.settings = settings;
        },
    },
    actions: {
        updateSetting(context, { vm, setting }) {
            axios.post("/settings/" + setting.id, {
                setting,
                _method: "put"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Agregamos una nueva conversacion si existe el objeto
                    if (response["data"].length == 0) {
                        return;
                    }
                    vm.makeToast("Setting updated", "The setting " + setting.name
                        + " has been updated.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Settings", "Something went wrong.", "danger");
            });
        },
    }
})
