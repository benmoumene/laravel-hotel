<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input v-model="customer.first_name" :readonly="readonly" placeholder="Jane"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input placeholder="Doe" v-model="customer.last_name" :readonly="readonly"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Address">
      <b-form-input
        v-model="customer.address"
        placeholder="Fruit Street 201, 55"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Phone">
      <b-form-input placeholder="666 666 666" v-model="customer.phone" :readonly="readonly"></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Sex">
      <b-form-select cols="12" sm="2" v-model="customer.sex" :disabled="readonly">
        <template v-slot:first>
          <option :readonly="readonly">{{ customer.sex }}</option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Document Identity">
      <b-form-group label-cols="12" label-cols-sm="4" label="Type">
        <b-form-select cols="12" sm="2" v-model="customer.document_id_type" :disabled="readonly">
          <template v-slot:first>
            <option :readonly="readonly">{{ customer.document_id_type }}</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label-cols="12" label-cols-sm="4" label="Id">
        <b-input
          cols="12"
          sm="2"
          placeholder="Document Id"
          v-model="customer.document_id"
          :readonly="readonly"
        ></b-input>
      </b-form-group>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Nationality">
      <b-input
        cols="12"
        sm="2"
        placeholder="Spanish"
        v-model="customer.nationality"
        :readonly="readonly"
      ></b-input>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Customer",
  props: {
    customerId: { type: Number, required: true },
    readonly: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({
      getCustomer: "customer/getCustomer"
    }),
    customer() {
      return this.getCustomer(this.customerId);
    }
  }
};
</script>
<style scoped>
</style>