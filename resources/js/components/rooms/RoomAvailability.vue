<template>
  <b-container id="app-wrap" class="app">
    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Room Type"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="roomType" size="sm" :options="roomTypes"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Hotel Floor"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="hotelFloor" :options="hotelFloors" size="sm"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="From date"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-input v-model="fromDate" id="from_date" type="date"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="To date"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-input v-model="toDate" id="to_date" type="date"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="roomList">
      <span
        v-b-modal.modal-center
        v-for="room in rooms"
        :key="room.id"
        class="room"
        :class="[ isAvailabe(room.id) ? 'available' : 'occupied']"
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
  name: "RoomAvailability",
  data: function() {
    return {
      roomType: "single",
      hotelFloor: "1F",
      roomTypes: ["single", "double", "suite"],
      hotelFloors: ["1F", "2F", "3F"],
      fromDate: this.getTodayDate(),
      toDate: null,
      selectedRoom: {},
      selectedReservation: {}
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
    showInfo() {
      console.log(this.roomType);
      console.log(this.fromDate);
    },
    showReservationInfo() {},
    makeReservation() {},
    cancelReservation() {},
    isAvailabe(roomId) {
      var room = this.filteredRooms.find(room => room.id === roomId);

      if (typeof room === "undefined") {
        return false;
      }
      return true;
    },
    applyFilters(room) {
      if (room.type == this.roomType && room.floor == this.hotelFloor) {
        for (var reservation of room.reservations) {
          /*
          if (this.fromDate > reservation.check_in) {
            if (reservation.check_out !== null && this.toDate !== null) {
              if (this.toDate < reservation.check_out) {
                return false;
              }
            }
          }
          */
        }
        return true;
      }

      return false;
    }
  },
  computed: {
    ...mapState(["rooms"]),
    filteredRooms: function() {
      return this.rooms.filter(room => this.applyFilters(room));
    }
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.roomList {
  max-width: 400px;
}
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
.occupied {
  background-color: red;
}
</style>