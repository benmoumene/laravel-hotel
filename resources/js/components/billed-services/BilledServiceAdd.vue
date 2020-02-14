<template>
  <b-container fluid>
    <b-row>
      <b-col cols="10">
        <b-form-group label-cols="12" label-cols-sm="4" label="Services">
          <select v-model="serviceId" class="custom-select">
            <option
              v-for="service in services"
              v-bind:key="service.id"
              v-bind:value="service.id"
            >{{ service.name }}</option>
          </select>
        </b-form-group>
      </b-col>
      <b-col cols="2" class="text-right">
        <b-button @click="add" variant="primary">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "BilledServiceAdd",
  props: {
    reservationId: { type: Number, required: true },
    readonly: { Type: Boolean, required: true }
  },
  data: function() {
    return {
      serviceId: null
    };
  },
  methods: {
    add() {
      this.$store.dispatch("billed_services/add", {
        vm: this,
        serviceId: this.serviceId,
        reservationId: this.reservationId
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
    ...mapState({
      services: state => state.service.services
    }),
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
    reservation() {
      return this.getReservation(this.reservationId);
    }
  }
};
</script>
