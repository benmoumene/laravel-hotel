<template>
  <b-container fluid>
    <b-row>
      <b-col cols="10">
        <b-form-group label-cols="12" label-cols-sm="4" label="Services">
          <select v-model="selectedServiceId" class="custom-select">
            <option
              v-for="service in services"
              v-bind:key="service.id"
              v-bind:value="service.id"
            >{{ service.name }} - {{ service.cost }}$</option>
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
      selectedServiceId: null
    };
  },
  methods: {
    add() {
      this.$store.dispatch("billedservice/storeService", {
        vm: this,
        serviceId: this.selectedServiceId,
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
    ...mapGetters({
      services: "service/getServices",
      getReservation: "reservation/getReservation"
    }),
    reservation() {
      return this.getReservation(this.reservationId);
    }
  }
};
</script>
