<template>
  <b-container id="app-wrap" class="app">
    <b-row>Filters: Avaliability, Floor, Type</b-row>
    <b-row>
      <span
        v-b-modal.modal-center
        v-for="room in rooms"
        :key="room.id"
        class="room"
        :class="[ isOccupied(room.id) ? 'occupied-room' : '']"
        @click="showInfo"
      >{{room.name}}</span>
    </b-row>

    <b-modal id="modal-center" centered title="Reservation Info">
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Room Name:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Type:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Floor:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">From:</b-col>
        <b-col sm="3" class="avatar-menu-inner">To:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">
          <b-button variant="danger">Cancel</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Reservations",
  data: function() {
    return {
      selectedRoom: {},
      selectedReservation: {}
    };
  },
  methods: {
    showInfo() {},
    showReservationInfo() {},
    makeReservation() {},
    cancelReservation() {},
    isOccupied(roomId) {
      var room = this.reservations.find(
        reservation => reservation.room_id === roomId
      );

      if (typeof room === "undefined") {
        return false;
      }

      return true;
    }
  },
  computed: {
    ...mapState(["rooms", "reservations"])
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.room {
  padding: 5px;
  text-align: center;
  border: 1px solid black;
  width: 40px;
  max-width: 40px;
  cursor: pointer;
  background-color: beige;
}
.available {
  background-color: greenyellow;
}
.occupied-room {
  background-color: red;
}
</style>