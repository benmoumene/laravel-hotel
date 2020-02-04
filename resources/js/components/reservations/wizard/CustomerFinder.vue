<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input placeholder="Jane" v-model="customer.first_name" @change="search"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input placeholder="Doe" v-model="customer.last_name" @change="search"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Document Identity">
      <b-form-group label-cols="12" label-cols-sm="4" label="Type">
        <b-form-select
          cols="12"
          sm="2"
          :value="null"
          :options="{'national_id':'National Id', 'passport':'Passport'}"
          v-model="customer.document_id_type"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label-cols="12" label-cols-sm="4" label="Id">
        <b-input
          cols="12"
          sm="2"
          placeholder="Document Id"
          v-model="customer.document_id"
          @change="search"
        ></b-input>
      </b-form-group>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Address">
      <b-form-input v-model="customer.address" placeholder="Fruit Street 201, 55"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Phone">
      <b-form-input placeholder="666 666 666" v-model="customer.phone"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Sex">
      <b-form-select
        cols="12"
        sm="2"
        :value="null"
        :options="{'male':'Male', 'female':'Female'}"
        id="inline-form-custom-select-pref"
        v-model="customer.sex"
      >
        <template v-slot:first>
          <option :value="null">Sex</option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Nationality">
      <b-input cols="12" sm="2" placeholder="Spanish" v-model="customer.nationality"></b-input>
    </b-form-group>

    <b-form-group>
      <b-button cols="12" sm="2" variant="primary" @click="selectCustomer">Select customer</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CustomerFinder",
  props: {
    reservation: Object
  },
  data: function() {
    return {
      filter: {},
      customer: {
        first_name: "",
        last_name: "",
        phone: "",
        sex: "",
        nationality: "",
        document_id_type: "",
        document_id: "",
        address: ""
      }
    };
  },
  methods: {
    search() {
      if (this.filteredCustomers.length === 1) {
        this.customer = this.filteredCustomers[0];
      }
    },
    applyFilters(customer) {
      if (
        this.customer.first_name === customer.first_name &&
        this.customer.last_name === customer.last_name &&
        this.customer.document_id === customer.document_id
      ) {
        return true;
      }
      return false;
    },
    selectCustomer() {
      this.reservation.customer = this.customer;
    }
  },
  computed: {
    ...mapState({
      customers: state => state.customer.customers
    }),
    filteredCustomers: function() {
      return this.customers.filter(customer => this.applyFilters(customer));
    }
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
</style>