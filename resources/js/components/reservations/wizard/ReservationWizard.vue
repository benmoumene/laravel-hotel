<template>
  <b-container fluid>
    <room-finder :reservation="reservation" class="step1"></room-finder>

    <div class="step2">
      RESUMEN DE LA RESERVA
      DATOS CUSTOMER, DATOS RESERVA, FACTURA
      <b-row>
        <b-col>First name:</b-col>
        <b-col>{{ reservation.customer.first_name }}</b-col>
      </b-row>
      <b-row>
        <b-col>Last name:</b-col>
        <b-col>{{ reservation.customer.last_name }}</b-col>
      </b-row>
      <b-row>
        <b-col>Room name:</b-col>
        <b-col>{{ reservation.room.name }}</b-col>
      </b-row>
      <b-row>
        <b-col>From:</b-col>
        <b-col>{{ reservation.check_in }}</b-col>
      </b-row>
      <b-row>
        <b-col>To:</b-col>
        <b-col>{{ reservation.check_out }}</b-col>
      </b-row>
    </div>
    <b-row class="mt-3 float-right">
      <b-col cols="12">
        <b-button v-if="wizardStep === 2" @click="nextStep('-1')">BACK</b-button>
        <b-button v-if="wizardStep === 1" @click="nextStep('1')">NEXT</b-button>
        <b-button v-if="wizardStep === 2" @click="confirmReservation" variant="success">CONFIRM</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import RoomFinder from "./RoomFinder";
import CustomerFinder from "./CustomerFinder";
// RoomAvailability.data (leer datos del componente)
export default {
  name: "ReservationWizard",
  data: function() {
    return {
      wizardStep: 1,
      reservation: {
        room: {},
        customer: {},
        check_in: null,
        check_out: null
      }
    };
  },
  methods: {
    confirmReservation() {
      this.$store.dispatch("reservation/addReservation", {
        vm: this,
        reservation: this.reservation
      });
    },
    nextStep(step) {
      var customer_id = parseInt(this.$route.params.customer_id);
      var customer = this.getCustomerById(customer_id);
      console.log(customer.first_name);
      this.reservation.customer = customer;

      var actualDiv = (document.getElementsByClassName(
        "step" + this.wizardStep
      )[0].style.display = "none");

      if (step === "1") {
        if (this.wizardStep < 3) {
          this.wizardStep += 1;
        }
      }

      if (step === "-1") {
        if (this.wizardStep > 1) {
          this.wizardStep -= 1;
        }
      }

      var nextDiv = (document.getElementsByClassName(
        "step" + this.wizardStep
      )[0].style.display = "inline");
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
      getCustomerById: "customer/getCustomerById"
    })
  },
  components: {
    "room-finder": RoomFinder,
    "customer-finder": CustomerFinder
  },
  mounted() {}
};
</script>
<style scoped>
.step2,
.step3,
.step4 {
  display: none;
}
</style>