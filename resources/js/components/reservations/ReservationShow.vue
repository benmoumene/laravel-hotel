<template>
  <b-container fluid v-if="!onReady">Loading ...</b-container>
  <b-container fluid v-else>
    <b-row class="mb-3">
      <h3>Reservation #{{ reservation.id }} Info</h3>
    </b-row>

    <b-form-group label-cols="12" label-cols-sm="4" label="From">
      <b-form-input :value="reservation.from_date" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="To">
      <b-form-input :value="reservation.to_date" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Status">
      <b-form-input :value="reservation.status" readonly></b-form-input>
    </b-form-group>

    <b-row class="mb-3">
      <h5>Guest</h5>
    </b-row>
    <b-form-group label-cols="12" label-cols-sm="4" label="Check in">
      <b-form-input v-if="guest" v-model="guest.check_in" readonly></b-form-input>
      <b-form-input v-else value="Guest is not here yet" readonly></b-form-input>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="4" label="Check Out">
      <b-form-input v-if="guest" :value="guest.check_out" readonly></b-form-input>
      <b-form-input v-else value="-" readonly></b-form-input>
    </b-form-group>

    <b-row class="mb-3">
      <h5>Customer</h5>
    </b-row>

    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input :value="customer.first_name" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input :value="customer.last_name" readonly></b-form-input>
    </b-form-group>

    <b-row class="mb-3">
      <h5>Room</h5>
    </b-row>
    <b-form-group label-cols="12" label-cols-sm="4" label="Room">
      <b-form-input :value="room.name" readonly></b-form-input>
    </b-form-group>

    <b-row class="mt-3 float-right">
      <b-col>
        <b-button @click="checkOut" variant="warning">Check Out</b-button>
        <b-button @click="checkIn" variant="success">Check In</b-button>
        <b-button @click="cancelReservation" variant="danger">Cancel</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ReservationShow",
  methods: {
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
    cancelReservation() {
      this.$store.dispatch("reservation/cancelReservation", {
        vm: this,
        reservation: this.reservation
      });
    },
    checkIn() {
      this.$store.dispatch("guest/guestCheckIn", {
        vm: this,
        reservation: this.reservation
      });
    },
    checkOut() {
      this.$store.dispatch("guest/guestCheckOut", {
        vm: this,
        reservation: this.reservation
      });
    }
  },
  computed: {
    ...mapState({
      reservations: state => state.reservation.reservations,
      onReady: state => state.reservation.ready
    }),
    ...mapGetters({
      getCustomer: "customer/getCustomer",
      getRoom: "room/getRoom",
      getGuest: "guest/getGuestWithReservationId",
      getReservation: "reservation/getReservation"
    }),
    reservation() {
      let reservationId = parseInt(this.$route.params.reservation_id);
      return this.getReservation(reservationId);
    },
    customer() {
      return this.getCustomer(this.reservation.customer_id);
    },
    room() {
      return this.getRoom(this.reservation.room_id);
    },
    guest() {
      return this.getGuest(this.reservation.id);
    }
  },
  watch: {
    onReady: function(rdy) {
      if (rdy) {
        // Esto se ejecuta cuando el state.reservation.reservations ha sido cargado
        // con el contenido de la api
      }
    }
  }
};
</script>