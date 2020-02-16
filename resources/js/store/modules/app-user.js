
export default ({
    namespaced: true,
    state: {
        appUser: {}
    },
    getters: {
        isAdmin: (state, getters) => {
            if (state.appUser.role === "admin") {
                return true;
            }
            return false;
        },
        isManager: (state, getters) => {
            if (state.appUser.role === "manager") {
                return true;
            }
            return false;
        },
        isRecepcionist: (state, getters) => {
            if (state.appUser.role === "recepcionist") {
                return true;
            }
            return false;
        },

    },
    mutations: {
        // Asigna el usuario de la app
        SET_USER(state, user) {
            state.appUser = user;
        },
    },
    actions: {
        logout(context) {
            axios.post("/logout").catch(error => {
                window.location.href = "/login";
            });
        },
        updateAvatar(context, { vm, avatar }) {
            var userId = context.state.appUser.id;
            var fd = new FormData();
            fd.append("image", avatar);
            fd.append("_method", "put");
            axios.post("/users/" + userId, fd).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    let newAvatar = response["data"]["profile"]["avatar_filename"];
                    context.state.appUser.avatar_filename = newAvatar;
                    vm.makeToast("Avatar", "The avatar has been updated!", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Avatar", error.response.data.message, "danger");
            });
        },
        updateProfile(context, { vm }) {
            var userId = context.state.appUser.id;
            axios.post("/users/" + userId, {
                profile: context.state.appUser,
                _method: "PUT"
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    vm.makeToast("Profile", "Profile updated.", "success");
                }
            }).catch(function (error) {
                vm.makeToast("Profile", error.response.data.message, "danger");
            });
        },
    }
})
