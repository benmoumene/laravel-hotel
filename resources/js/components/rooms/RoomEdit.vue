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
          :options="{'common':'Common', 'suite':'Suite'}"
          v-model="room.type"
        ></b-form-select>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Capacity</label>
        <b-form-select class="col-3" :value="null" :options="[1,2,3,4]" v-model="room.capacity"></b-form-select>
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
    return {
      room: {
        name: "",
        type: "common",
        capacity: 1,
        status: "not_avaliable"
      }
    };
  },
  methods: {
    update() {}
  },
  computed: {
    ...mapGetters(["getRoomById"]),

    getRoom: function() {
      var roomId = this.$route.params.id;
      return this.getRoomById(roomId);
      //return this.room;
    }
  },
  updated() {}
};
</script>
<style scoped>
</style>