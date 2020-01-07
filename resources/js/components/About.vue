<template>
  <b-container fluid>
    <b-row class="mb-3">
      <b-col>{{ this.getSettingValue('hotel_about') }}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <strong>Phone:</strong>
        {{ this.getSettingValue('hotel_phone') }}
        <i class="fas fa-phone"></i>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <strong>Address:</strong>
        {{ this.getSettingValue('hotel_address') }}
        <i class="fas fa-map-marker-alt"></i>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "About",
  methods: {},
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["getSettingValue"])
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.avatar {
  padding: 5px;
}
</style>