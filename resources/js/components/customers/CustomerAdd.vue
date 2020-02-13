<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input placeholder="Jane" v-model="customer.first_name"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input placeholder="Doe" v-model="customer.last_name"></b-form-input>
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
        <b-input cols="12" sm="2" placeholder="Document Id" v-model="customer.document_id"></b-input>
      </b-form-group>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Nationality">
      <b-input cols="12" sm="2" placeholder="Spanish" v-model="customer.nationality"></b-input>
    </b-form-group>

    <b-form-group class="text-right">
      <b-button cols="12" sm="2" variant="primary" @click="add">Add Customer</b-button>
    </b-form-group>
  </b-container>
</template>
<script>
export default {
  name: "CustomerAdd",
  data: function() {
    return {
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
    add() {
      this.$store.dispatch("customer/addCustomer", {
        vm: this,
        customer: this.customer
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