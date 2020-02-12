<template>
  <b-container fluid>
    <b-row>
      <room-info v-if="roomId" :roomId="roomId" :readonly="false"></room-info>
    </b-row>
    <b-form-group class="float-right">
      <b-button variant="primary" @click="update">Update Room</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import Room from "./Room";
export default {
  name: "RoomEdit",
  methods: {
    update() {
      this.$store.dispatch("room/editRoom", {
        vm: this,
        room: this.getRoom(this.roomId)
      });
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
    ...mapGetters({ getRoom: "room/getRoom" }),
    roomId() {
      return parseInt(this.$route.params.id);
    }
  },
  components: {
    "room-info": Room
  }
};
</script>