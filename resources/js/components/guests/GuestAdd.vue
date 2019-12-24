<template>
  <b-container fluid>
    <b-form-group>
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">First Name</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane"
          v-model="guest.first_name"
        ></b-input>

        <label class="sr-only" for="inline-form-input-name">Last Name</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Doe"
          v-model="guest.last_name"
        ></b-input>

        <label class="sr-only" for="inline-form-input-name">Address</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Fruit Street 201, 55"
          v-model="guest.address"
        ></b-input>

        <label class="sr-only" for="inline-form-input-name">Phone</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="666 666 666"
          v-model="guest.phone"
        ></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <label class="mr-sm-2" for="inline-form-custom-select-pref">Sex</label>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0"
          :value="null"
          :options="{'male':'Male', 'female':'Female'}"
          id="inline-form-custom-select-pref"
          v-model="guest.sex"
        >
          <template v-slot:first>
            <option :value="null">Sex</option>
          </template>
        </b-form-select>

        <label class="mr-sm-2" for="inline-form-custom-select-pref">Document ID type</label>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0"
          :value="null"
          :options="{'national_id':'National Id', 'passport':'Passport'}"
          id="inline-form-custom-select-pref"
          v-model="guest.document_id_type"
        >
          <template v-slot:first>
            <option :value="null">Choose...</option>
          </template>
        </b-form-select>

        <label class="sr-only" for="inline-form-input-name">Document Id</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Document Id"
          v-model="guest.document_id"
        ></b-input>

        <label class="sr-only" for="inline-form-input-name">Nationality</label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Spanish"
          v-model="guest.nationality"
        ></b-input>
      </b-form>
    </b-form-group>

    <b-form-group>
      <b-form inline>
        <b-button variant="primary" @click="add">Save</b-button>
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