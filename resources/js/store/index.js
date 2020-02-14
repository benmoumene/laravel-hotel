import Vuex from "vuex"
import Vue from "vue"

// Modules
import room from "./modules/room"
import service from "./modules/service"
import customer from "./modules/customer"
import reservation from "./modules/reservation"
import inventory from "./modules/inventory"
import invoice from "./modules/invoice"
import guest from "./modules/guest"
import billedservice from "./modules/billed-service"
import appuser from "./modules/app-user"
import setting from "./modules/setting"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        room, service, customer, inventory,
        reservation, invoice, guest, billedservice,
        setting, appuser
    },
    state: {
        ready: false
    },
    getters: {
    },
    mutations: {
        SET_READY(state, ready) {
            state.ready = ready;
        },
    },
    actions: {
        // Este metodo realiza una peticion al backend y recibe los datos
        // necesarios para inicializar la aplicacion
        fetchData(context) {
            axios.get("/hotel/fetch").then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    var data = response["data"];

                    // Userdata
                    context.commit("appuser/SET_USER", data["app_user"]);
                    // Settings
                    context.commit("setting/SET_SETTINGS", data["settings"]);
                    // Guests
                    context.commit("guest/SET_GUESTS", data["guests"]);
                    // Customers
                    context.commit("customer/SET_CUSTOMERS", data["customers"]);
                    // Services
                    context.commit("service/SET_SERVICES", data["services"]);
                    // Billed Services
                    context.commit("billedservice/SET_BILLED_SERVICES", data["billed_services"]);
                    // Reservations
                    context.commit("reservation/SET_RESERVATIONS", data["reservations"]);
                    // Invoices
                    context.commit("invoice/SET_INVOICES", data["invoices"]);
                    // Inventory
                    context.commit("inventory/SET_ITEMS", data["inventory"]);
                    // Rooms
                    context.commit("room/SET_ROOMS", data["rooms"]);
                    context.commit("SET_READY", true);
                }
            });
        },

    }
})
