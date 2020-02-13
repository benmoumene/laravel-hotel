<template>
  <b-container fluid>
    <billed-service-add :reservationId="reservationId" :readonly="false"></billed-service-add>YOUR BILLED SERVICES:
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import BilledServiceAdd from "./BilledServiceAdd";
export default {
  name: "BilledServices",
  props: {
    reservationId: { type: Number, required: true },
    readonly: { Type: Boolean, required: true }
  },
  data: function() {
    return {};
  },
  methods: {
    deleteBilledService(id) {},
    makeToast(title, message, variant = "info") {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        appendToast: true
      });
    }
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters({
      getService: "service/getService",
      getCustomer: "customer/getCustomer",
      getBilledServices: "billed_services/getBilledServices",
      getReservation: "reservation/getReservation",
      getGuestWithReservationId: "guest/getGuestWithReservationId",
      getSettingValue: "getSettingValue",
      getInvoice: "billing/getInvoice",
      getRoom: "room/getRoom"
    }),
    invoice() {
      if (typeof this.invoiceId === "undefined") {
        this.invoiceId = parseInt(this.$route.params.id);
      }

      var invoice = this.getInvoice(this.invoiceId);
      if (typeof invoice === "undefined") {
        return "";
      }
      return invoice;
    },
    reservation() {
      var reservation = this.getReservation(this.invoice.reservation_id);

      if (typeof reservation === "undefined") {
        return "";
      }
      return reservation;
    },
    guest() {
      var guest = this.getGuestWithReservationId(this.invoice.reservation_id);

      if (typeof guest === "undefined") {
        //return { id: 0, from_date: "", to_date: "" };
        return "";
      }
      return guest;
    },
    customer() {
      var customer = this.getCustomer(this.reservation.customer_id);
      if (typeof customer === "undefined") {
        //return { id: 0, from_date: "", to_date: "" };
        return "";
      }
      return customer;
    },
    room() {
      var room = this.getRoom(this.reservation.room_id);
      if (typeof room === "undefined") {
        return "";
      }
      return room;
    },
    billedServices() {
      var services = this.getBilledServices(this.reservation.id);
      if (typeof services === "undefined") {
        return [];
      }
      return services;
    }
  },
  mounted() {},
  components: {
    "billed-service-add": BilledServiceAdd
  }
};
</script>
