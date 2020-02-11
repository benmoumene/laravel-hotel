<template>
  <b-container fluid>GUEST OF MINE!!! {{ guestId }}</b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Guest",
  props: {
    guestId: { type: Number, required: true }
  }
};
</script>