<template>
  <b-container fluid v-if="room">
    <b-form-group label-cols="12" label-cols-sm="2" label="Name">
      <b-form-input placeholder="001" v-model="room.name" :readonly="readonly"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Type">
      <b-form-select
        :value="null"
        :options="{ 'common': 'Common', 'suite': 'Suite'}"
        v-model="room.type"
        :disabled="readonly"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="size">
      <b-form-select
        :value="null"
        :options="{ 'single': 'Single', 'double': 'Double'}"
        v-model="room.size"
        :disabled="readonly"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="Location">
      <b-form-select
        :value="null"
        :options="{'1F':'1 Floor', '2F': '2 Floor' , '3F': '3 Floor'}"
        v-model="room.floor"
        :disabled="readonly"
      ></b-form-select>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Room",
  props: {
    roomId: { Type: Number, required: true },
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
    ...mapGetters({ getRoom: "room/getRoom" }),
    room() {
      return this.getRoom(this.roomId);
    }
  }
};
</script>