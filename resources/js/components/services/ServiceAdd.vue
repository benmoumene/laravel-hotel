<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="col-3">Service Name</label>
        <b-input class="col-3" placeholder="001" v-model="service.name"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Service cost</label>
        <b-input class="col-3" placeholder="10.01" v-model="service.cost"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Service Comments</label>
        <b-input class="col-3" placeholder="..." v-model="service.comments"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3"></label>
        <b-button class="col-2 float-right" variant="primary" @click="add">Add Service</b-button>
      </b-form>
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
      this.$store.dispatch("addService", this.service);
      this.makeToast(true);
    },
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast("Service added", {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append
      });
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>