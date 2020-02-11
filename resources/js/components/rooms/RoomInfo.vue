<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="2" label="Name">
      <b-form-input placeholder="001" v-model="room.name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Type">
      <b-form-select
        :value="null"
        :options="{ 'common': 'Common', 'suite': 'Suite'}"
        v-model="room.type"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="size">
      <b-form-select
        :value="null"
        :options="{ 'single': 'Single', 'double': 'Double'}"
        v-model="room.size"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="Location">
      <b-form-select
        :value="null"
        :options="{'1F':'1 Floor', '2F': '2 Floor' , '3F': '3 Floor'}"
        v-model="room.floor"
      ></b-form-select>
    </b-form-group>

    <b-form-group class="float-right">
      <b-button variant="primary" @click="update">Update Room</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "RoomInfo",
  props: {
    roomId: { Type: Number, required: true }
  },
  data: function() {
    return {};
  },
  methods: {
    update() {
      this.$store.dispatch("room/editRoom", { vm: this, room: this.room });
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
    ...mapGetters({ getRoomById: "room/getRoomById" }),
    room: function() {
      return this.getRoomById(this.roomId);
    }
  }
};
</script>