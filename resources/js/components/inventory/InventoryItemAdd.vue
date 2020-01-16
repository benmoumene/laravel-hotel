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
        <label class="col-3">Min. Stock</label>
        <b-input class="col-3" placeholder="50" v-model="item.min_stock"></b-input>
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
        min_stock: 10,
        description: ""
      }
    };
  },
  methods: {
    add() {
      this.$store.dispatch("inventory/addItem", { vm: this, item: this.item });
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