<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="col-3">Item Name</label>
        <b-input class="col-3" placeholder="001" v-model="item.name"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Quantity</label>
        <b-input class="col-3" placeholder="10.01" v-model="item.quantity"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3">Description</label>
        <b-input class="col-3" placeholder="..." v-model="item.description"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-3"></label>
        <b-button class="col-2 float-right" variant="primary" @click="add">Add item</b-button>
      </b-form>
    </b-form-group>
  </b-container>
</template>
<script>
export default {
  name: "InventoryItemAdd",
  data: function() {
    return {
      item: {
        name: "",
        quantity: 0,
        description: ""
      }
    };
  },
  methods: {
    add() {
      this.$store.dispatch("addInventoryItem", this.item);
      this.makeToast(true);
    },
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast("Inventory Item added", {
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