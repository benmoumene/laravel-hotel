<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="col-3">Room Name</label>
        <b-input class="col-3" placeholder="001" v-model="getRoom.name"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Room type</label>
        <b-form-select
          class="col-3"
          :value="null"
          :options="{ 'single': 'Single', 'double': 'Double', 'suite': 'Suite'}"
          v-model="getRoom.type"
        ></b-form-select>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Location</label>
        <b-form-select
          class="col-3"
          :value="null"
          :options="{'1F':'1 Floor', '2F': '2 Floor' , '3F': '3 Floor'}"
          v-model="getRoom.location"
        ></b-form-select>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3"></label>
        <b-button class="col-2 float-right" variant="primary" @click="update">Update Room</b-button>
      </b-form>
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
      this.$store.dispatch("editRoom", this.getRoom);
    }
  },
  computed: {
    ...mapGetters(["getRoomById"]),
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