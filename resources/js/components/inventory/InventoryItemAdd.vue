<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="2" label="Name">
      <b-form-input placeholder="Item name" v-model="item.name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Quantity">
      <b-form-input placeholder="Quantity" v-model="item.quantity"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Min. Stock">
      <b-form-input placeholder="Min. Stock" v-model="item.min_stock"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="2" label="Description">
      <b-form-input placeholder="Description" v-model="item.description"></b-form-input>
    </b-form-group>

    <b-form-group class="text-right">
      <b-button variant="primary" @click="add">Add</b-button>
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
      this.$store.dispatch("inventory/storeItem", {
        vm: this,
        item: this.item
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
  }
};
</script>