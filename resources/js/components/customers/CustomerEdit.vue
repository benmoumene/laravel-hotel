<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input placeholder="Jane" v-model="getCustomer.first_name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input placeholder="Doe" v-model="getCustomer.last_name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Address">
      <b-form-input v-model="getCustomer.address" placeholder="Fruit Street 201, 55"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Phone">
      <b-form-input placeholder="666 666 666" v-model="getCustomer.phone"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Sex">
      <b-form-select
        cols="12"
        sm="2"
        :value="null"
        :options="{'male':'Male', 'female':'Female'}"
        id="inline-form-custom-select-pref"
        v-model="getCustomer.sex"
      >
        <template v-slot:first>
          <option :value="null">Sex</option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Document Identity">
      <b-form-group label-cols="12" label-cols-sm="4" label="Type">
        <b-form-select
          cols="12"
          sm="2"
          :value="null"
          :options="{'national_id':'National Id', 'passport':'Passport'}"
          v-model="getCustomer.document_id_type"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label-cols="12" label-cols-sm="4" label="Id">
        <b-input cols="12" sm="2" placeholder="Document Id" v-model="getCustomer.document_id"></b-input>
      </b-form-group>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Nationality">
      <b-input cols="12" sm="2" placeholder="Spanish" v-model="getCustomer.nationality"></b-input>
    </b-form-group>

    <b-form-group>
      <b-button cols="12" sm="2" variant="primary" @click="edit">Edit Customer</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomerEdit",
  data: function() {
    return {};
  },
  methods: {
    edit() {
      this.$store.dispatch("customer/editCustomer", {
        vm: this,
        customer: this.getCustomer
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
      getCustomerById: "customer/getCustomerById"
    }),
    getCustomer: function() {
      var customerId = parseInt(this.$route.params.id);
      var customer = this.getCustomerById(customerId);
      if (typeof customer === "undefined") {
        return "";
      }
      return customer;
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>