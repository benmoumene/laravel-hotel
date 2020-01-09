<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="col-1">First Name</label>
        <b-input class="col-2" placeholder="Jane" v-model="guest.first_name"></b-input>

        <label class="col-1" for="inline-form-input-name">Last Name</label>
        <b-input class="col-2" placeholder="Doe" v-model="guest.last_name"></b-input>

        <label class="col-1" for="inline-form-input-name">Address</label>
        <b-input class="col-5" placeholder="Fruit Street 201, 55" v-model="guest.address"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-1">Document type</label>
        <b-form-select
          class="col-2"
          :value="null"
          :options="{'national_id':'National Id', 'passport':'Passport'}"
          v-model="guest.document_id_type"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>

        <label class="col-1">Document Id</label>
        <b-input class="col-2" placeholder="Document Id" v-model="guest.document_id"></b-input>

        <label class="col-1">Phone</label>
        <b-input class="col-2" placeholder="666 666 666" v-model="guest.phone"></b-input>

        <label class="col-1">Sex</label>
        <b-form-select
          class="col-2"
          :value="null"
          :options="{'male':'Male', 'female':'Female'}"
          id="inline-form-custom-select-pref"
          v-model="guest.sex"
        >
          <template v-slot:first>
            <option :value="null">Sex</option>
          </template>
        </b-form-select>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="col-1">Nationality</label>
        <b-input class="col-2" placeholder="Spanish" v-model="guest.nationality"></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <b-button class="col-2" variant="primary" @click="add">Add Guest</b-button>
      </b-form>
    </b-form-group>
  </b-container>
</template>
<script>
export default {
  name: "GuestAdd",
  data: function() {
    return {
      guest: {
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
      this.$store.dispatch("addGuest", this.guest);
    }
  },
  computed: {},
  mounted() {}
};
</script>
<style scoped>
</style>