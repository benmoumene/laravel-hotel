<template>
  <b-container fluid>
    <room-finder :reservation="reservation" v-if="wizardStep == 1"></room-finder>
    <b-row class="mt-3 float-right">
      <b-col>
        <b-button v-if="wizardStep === 1" @click="nextStep('+1')">Next</b-button>
      </b-col>
    </b-row>

    <div v-if="wizardStep == 2">
      <b-row class="mb-3">
        <h3>Reservation Info</h3>
      </b-row>
      <b-form-group label-cols="12" label-cols-sm="4" label="From">
        <b-form-input :value="reservation.from_date" readonly></b-form-input>
      </b-form-group>
      <b-form-group label-cols="12" label-cols-sm="4" label="To">
        <b-form-input :value="reservation.to_date" readonly></b-form-input>
      </b-form-group>

      <b-row class="mb-3">
        <h5>Customer</h5>
      </b-row>
      <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
        <b-form-input v-if="customer" :value="customer.first_name" readonly></b-form-input>
      </b-form-group>
      <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
        <b-form-input v-if="customer" :value="customer.last_name" readonly></b-form-input>
      </b-form-group>
      <b-row class="mb-3">
        <h5>Room</h5>
      </b-row>
      <b-form-group label-cols="12" label-cols-sm="4" label="Room">
        <b-form-input :value="reservation.room.name" readonly></b-form-input>
      </b-form-group>
      <b-row class="mt-3 float-right">
        <b-col>
          <b-button @click="nextStep('-1')">Back</b-button>
          <b-button @click="confirmReservation" variant="primary">Confirm</b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import ReservationRoomFinder from "./ReservationRoomFinder";
export default {
  name: "ReservationWizard",
  data: function() {
    return {
      wizardStep: 1,
      reservation: {
        room: {},
        from_date: this.getTodayDate(),
        to_date: this.getTodayDate()
      }
    };
  },
  methods: {
    getTodayDate() {
      var date = new Date();
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = date.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
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
    },
    confirmReservation() {
      this.reservation.customer = this.customer;

      this.$store.dispatch("reservation/addReservation", {
        vm: this,
        reservation: this.reservation
      });
    },
    nextStep(step) {
      if (step === "+1" && this.wizardStep === 1) {
        this.wizardStep = 2;
      }
      if (step === "-1" && this.wizardStep === 2) {
        this.wizardStep = 1;
      }
    }
  },
  computed: {
    ...mapState({
      isReady: state => state.ready
    }),
    ...mapGetters({
      getCustomerById: "customer/getCustomerById",
      getRoom: "room/getRoom"
    }),
    customer() {
      var customerId = parseInt(this.$route.params.customer_id);
      return this.getCustomerById(customerId);
    }
  },
  components: {
    "room-finder": ReservationRoomFinder
  }
};
</script>