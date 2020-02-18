<template>
  <b-container fluid>
    <b-row class="mb-3">
      <b-col>{{ setting('hotel_about') }}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <strong>Phone:</strong>
        {{ setting('hotel_phone') }}
        <i class="fas fa-phone"></i>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <strong>Address:</strong>
        {{ setting('hotel_address') }}
        <i class="fas fa-map-marker-alt"></i>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "About",
  computed: {
    ...mapGetters({
      setting: "setting/getSettingValue"
    })
  }
};
</script>