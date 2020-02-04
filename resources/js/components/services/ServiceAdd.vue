<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="2" label="Name">
      <b-form-input placeholder="Mini-Bar" v-model="service.name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Cost">
      <b-form-input placeholder="10.00" v-model="service.cost"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Comment">
      <b-form-input v-model="service.comments" placeholder="Description of this service"></b-form-input>
    </b-form-group>

    <b-form-group class="float-right">
      <b-button variant="primary" @click="add">Add Service</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
export default {
  name: "ServiceAdd",
  data: function() {
    return {
      service: {
        name: "",
        cost: 0.0,
        comments: ""
      }
    };
  },
  methods: {
    add() {
      this.$store.dispatch("service/addService", {
        vm: this,
        service: this.service
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
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>