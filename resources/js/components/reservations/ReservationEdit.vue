<template>
  <b-container fluid v-if="!onReady">Loading ...</b-container>
  <b-container fluid v-else>
    <reservation-info :reservationId="reservationId" :readonly="false"></reservation-info>
    <b-row class="mt-3 mb-3">
      <b-col class="text-right">
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
  name: "Reservation",
  props: {
    reservationId: { type: Number, required: true },
    readonly: { Type: Boolean, required: true }
  },
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
      this.$store.dispatch("reservation/cancel", {
        vm: this,
        reservation: this.reservation
      });
    },
    checkIn() {
      this.$store.dispatch("guest/checkIn", {
        vm: this,
        reservation: this.reservation
      });
    },
    checkOut() {
      this.$store.dispatch("guest/checkOut", {
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
      // Comprobar si existe reservationId en props
      if (this.reservationId) {
        return this.getReservation(this.reservationId);
      }
      this.reservationId = parseInt(this.$route.params.reservation_id);
      return this.getReservation(this.reservationId);
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
  }
};
</script>