<template>
  <b-container fluid>
    <b-row class="mb-3">
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
          <b-form-select v-model="filter.roomType" size="sm" :options="roomTypes"></b-form-select>
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
          <b-form-select v-model="filter.roomFloor" :options="roomFloors" size="sm"></b-form-select>
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
          <b-form-input v-model="reservation.from_date" id="from_date" type="date"></b-form-input>
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
          <b-form-input v-model="reservation.to_date" id="to_date" type="date"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="roomList mb-3">
      <b-col
        cols="12"
        sm="1"
        v-for="room in filteredRooms"
        :key="room.id"
        :class="['room', isSelected(room.id) ? 'bg-primary' : isAvailable(room.id) ? 'bg-success' : 'bg-danger']"
        @click="selectRoom(room)"
      >{{room.name}}</b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ReservationRoomFinder",
  props: {
    reservation: Object
  },
  data: function() {
    return {
      filter: {
        roomType: "common",
        roomFloor: "1F"
      },
      roomTypes: ["Any", "common", "suite"],
      roomFloors: ["Any", "1F", "2F", "3F"],
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
    selectRoom(room) {
      this.reservation.room = room;
    },
    isSelected(roomId) {
      if (roomId === this.reservation.room.id) {
        return true;
      }
      return false;
    },
    isAvailable(roomId) {
      var room = this.filteredRooms.find(room => room.id === roomId);
      let fromDate = this.reservation.from_date;
      let toDate = this.reservation.to_date;

      // Buscamos reservas activas en la misma fecha
      let reservations = this.reservations.find(
        reservation =>
          reservation.room_id === roomId &&
          reservation.status === "active" &&
          ((fromDate >= reservation.from_date &&
            fromDate <= reservation.to_date) ||
            (toDate >= reservation.from_date &&
              toDate <= reservation.to_date) ||
            (fromDate <= reservation.from_date &&
              toDate >= reservation.to_date))
      );

      // SI existen reservas activas en la misma fecha, no esta disponible
      if (typeof reservations !== "undefined") {
        //console.log("no disponible");
        return false;
      }
      //console.log("disponible");
      return true;
    }
  },
  computed: {
    ...mapGetters({
      rooms: "room/getRooms",
      reservations: "reservation/getReservations"
    }),
    filteredRooms() {
      return this.rooms.filter(
        room =>
          (this.filter.roomFloor === "Any"
            ? true
            : room.floor === this.filter.roomFloor) &&
          (this.filter.roomType === "Any"
            ? true
            : room.type === this.filter.roomType)
      );
    }
  }
};
</script>
<style scoped>
.roomList {
  /*max-width: 400px;*/
}
.room {
  padding: 5px;
  text-align: center;
  border: 1px solid black;
  /*width: 40px;
  max-width: 60px;*/
  height: 60px;
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