<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="2" label="Name">
      <b-form-input placeholder="001" v-model="getRoom.name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Type">
      <b-form-select
        :value="null"
        :options="{ 'common': 'Common', 'suite': 'Suite'}"
        v-model="getRoom.type"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="size">
      <b-form-select
        :value="null"
        :options="{ 'single': 'Single', 'double': 'Double'}"
        v-model="getRoom.size"
      ></b-form-select>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="Location">
      <b-form-select
        :value="null"
        :options="{'1F':'1 Floor', '2F': '2 Floor' , '3F': '3 Floor'}"
        v-model="getRoom.floor"
      ></b-form-select>
    </b-form-group>

    <b-form-group class="float-right">
      <b-button variant="primary" @click="update">Update Room</b-button>
    </b-form-group>
  </b-container>
</template>
    
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "RoomEdit",
  data: function() {
    return {};
  },
  methods: {
    update() {
      this.$store.dispatch("room/editRoom", { vm: this, room: this.getRoom });
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
    getRoom: function() {
      var roomId = parseInt(this.$route.params.id);
      var room = this.getRoomById(roomId);
      if (typeof room === "undefined") {
        return "";
      }
      return room;
    }
  },
  updated() {}
};
</script>
<style scoped>
</style>