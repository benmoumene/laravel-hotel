<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="Room Name">
      <b-form-input placeholder="Jane" :value="room_name" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Check in">
      <b-form-input placeholder="Jane" :value="check_in" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Check out">
      <b-form-input placeholder="Jane" :value="check_out" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label>
      <router-link :to="{path: id +'/edit'}">
        <b-button variant="info" sm="4">Reservation</b-button>
      </router-link>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "GuestInfo",
  props: {
    room_name: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { required: true }
  }
};
</script>
<style scoped>
</style>