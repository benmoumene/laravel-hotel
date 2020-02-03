<template>
  <b-container fluid>
    <b-form-group label-cols="12" label-cols-sm="4" label="First Name">
      <b-form-input placeholder="Jane" :value="first_name" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Last Name">
      <b-form-input placeholder="Doe" :value="last_name" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Address">
      <b-form-input :value="address" placeholder="Fruit Street 201, 55" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Phone">
      <b-form-input placeholder="666 666 666" :value="phone" readonly></b-form-input>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Sex">
      <b-form-select cols="12" sm="2" :value="sex" disabled>
        <template v-slot:first>
          <option readonly>{{ sex }}</option>
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Document Identity">
      <b-form-group label-cols="12" label-cols-sm="4" label="Type">
        <b-form-select cols="12" sm="2" :value="document_id_type" disabled>
          <template v-slot:first>
            <option readonly>{{ document_id_type }}</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label-cols="12" label-cols-sm="4" label="Id">
        <b-input cols="12" sm="2" placeholder="Document Id" :value="document_id" readonly></b-input>
      </b-form-group>
    </b-form-group>

    <b-form-group label-cols="12" label-cols-sm="4" label="Nationality">
      <b-input cols="12" sm="2" placeholder="Spanish" :value="nationality" readonly></b-input>
    </b-form-group>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CustomerInfo",
  props: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    document_id: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    document_id_type: { type: String, required: true },
    sex: { type: String, required: true }
  }
};
</script>
<style scoped>
</style>