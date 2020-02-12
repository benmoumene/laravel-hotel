<template>
  <b-container v-if="!guest" fluid>Loading...</b-container>
  <b-container fluid v-else>
    <b-form-group label-cols="12" label-cols-sm="2" label="Check In">
      <b-form-input
        placeholder="No checkin registered"
        v-model="guest.check_in"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-form-group label-cols="12" label-cols-sm="2" label="Check Out">
      <b-form-input
        placeholder="No checkout registered"
        v-model="guest.check_out"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Guest",
  props: {
    guestId: { type: Number, required: true },
    readonly: { Type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({ getGuest: "guest/getGuest" }),
    guest() {
      return this.getGuest(this.guestId);
    }
  }
};
</script>