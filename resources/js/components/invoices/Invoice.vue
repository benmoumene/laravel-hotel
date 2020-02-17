<template>
  <b-container fluid v-if="!invoice">Loading...</b-container>
  <b-container fluid v-else>
    <div id="invoice" class="invoice">
      <b-row class="header mb-3">
        <b-col cols="12">
          <strong>{{ getSettingValue('hotel_name') }}</strong>
        </b-col>
        <b-col cols="12">{{ getSettingValue('hotel_address') }}</b-col>
        <b-col cols="12">{{ getSettingValue('hotel_phone') }}</b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <strong>Invoice #</strong>
          {{ invoice.id }}
          <b-badge :variant="invoice.status == 'paid' ? 'success' : 'danger'">{{ invoice.status }}</b-badge>
        </b-col>
        <b-col>
          <strong>Date</strong>
          {{ invoice.generated_on }}
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Customer</strong>
        </b-col>
        <b-col cols="12">
          <strong>Name</strong>
          {{ customer.first_name }}
          {{ customer.last_name }}
        </b-col>
        <b-col cols="6">
          <strong>Phone</strong>
          {{ customer.phone }}
        </b-col>
        <b-col cols="6">
          <strong>Address</strong>
          {{ customer.address }}
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Reservation</strong>
        </b-col>

        <b-col cols="6">
          <strong>From</strong>
          {{ reservation.from_date }}
        </b-col>
        <b-col cols="6">
          <strong>To</strong>
          {{ reservation.to_date }}
        </b-col>
        <b-col cols="6">
          <strong>Arrival</strong>
          {{ guest.check_in }}
        </b-col>
        <b-col cols="6">
          <strong>Left</strong>
          {{ guest.check_out }}
        </b-col>
        <b-col cols="6">
          <strong>Room</strong>
          {{ room.name }}
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Billed Services</strong>
        </b-col>
        <b-col cols="12">
          <b-row v-for="billed_service in billedServices" :key="billed_service.id">
            <b-col>
              <b-link @click="deleteBilledService(billed_service.id)">
                <i class="fas fa-trash"></i>
              </b-link>
              {{ getService(billed_service.service_id).name }}
            </b-col>
            <b-col>{{ getService(billed_service.service_id).cost }}</b-col>
            <b-col>{{ billed_service.billed_on }}</b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Total</strong>
        </b-col>
        <b-col cols="12">Due amount: {{ invoice.total }}</b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Invoice",
  props: {
    id: { type: Number, required: false },
    readonly: { Type: Boolean, required: false }
  },
  data: function() {
    return {
      invoicex: { billed_services: [] }
    };
  },
  methods: {
    deleteBilledService(id) {
      this.$store.dispatch("billed_services/delete", {
        vm: this,
        id
      });
    },
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
      getBilledServicesFromReservation:
        "billedservice/getBilledServicesFromReservation",
      getReservation: "reservation/getReservation",
      getGuest: "guest/getGuestWithReservationId",
      getSettingValue: "setting/getSettingValue",
      getInvoice: "invoice/getInvoice",
      getRoom: "room/getRoom"
    }),
    invoice() {
      return this.getInvoice(this.id);
    },
    reservation() {
      var reservation = this.getReservation(this.invoice.reservation_id);

      if (typeof reservation === "undefined") {
        return "";
      }
      return reservation;
    },
    guest() {
      var guest = this.getGuest(this.invoice.reservation_id);

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
      var services = this.getBilledServicesFromReservation(this.reservation.id);
      if (typeof services === "undefined") {
        return [];
      }
      return services;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.invoice {
  border: 1px solid gray;
  padding: 5px 15px;
}
</style>