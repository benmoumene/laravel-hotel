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
          :options="{ 'single': 'Single', 'double': 'Double', 'suite': 'Suite'}"
          v-model="room.type"
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
          v-model="room.floor"
        ></b-form-select>
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
        type: "single",
        floor: "1F"
      }
    };
  },
  methods: {
    add() {
      this.$store.dispatch("room/addRoom", { room: this.room, vm: this });
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
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>