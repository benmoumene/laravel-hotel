<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="col-3">Room Name</label>
        <b-input class="col-3" placeholder="001" v-model="room.name"></b-input>
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
        <b-button class="col-2 float-right" variant="primary" @click="add">Add Room</b-button>
      </b-form>
    </b-form-group>
  </b-container>
</template>
<script>
export default {
  name: "RoomAdd",
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
    add() {
      this.$store.dispatch("addRoom", this.room);
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>