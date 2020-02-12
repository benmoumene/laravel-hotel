<template>
  <b-container fluid>
    <customer-info v-if="customerId" :customerId="customerId" :readonly="false"></customer-info>
    <b-row class="modal-footer">
      <b-button variant="primary" @click="edit">Edit customer</b-button>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import Customer from "./Customer";
export default {
  name: "CustomerEdit",
  props: {
    customerId: { type: Number, required: true },
    readonly: { type: Boolean, required: true }
  },
  methods: {
    edit() {
      this.$store.dispatch("customer/editCustomer", {
        vm: this,
        customer: this.getCustomer(this.customerId)
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
  computed: {
    ...mapGetters({
      getCustomer: "customer/getCustomer"
    })
  },
  components: {
    "customer-info": Customer
  }
};
</script>