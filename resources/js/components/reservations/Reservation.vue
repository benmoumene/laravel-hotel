<template>
  <b-container fluid v-if="!onReady">Loading ...</b-container>
  <b-container fluid v-else>
    <b-row class="mb-3">
      <b-col>
        <h3>Reservation #{{ reservation.id }} Info</h3>
      </b-col>
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
    <b-form-group label-cols="12" label-cols-sm="4" label="Name">
      <b-form-input :value="room.name" readonly></b-form-input>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="4" label="Size">
      <b-form-input :value="room.size" readonly></b-form-input>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="4" label="Floor">
      <b-form-input :value="room.floor" readonly></b-form-input>
    </b-form-group>
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
      return this.getGuest(this.reservationId);
    }
  }
};
</script>