<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" sm="8">
        <b-form-group label-cols="12" label-cols-sm="4" label="Username">
          <b-form-input v-model="appUser.name"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="12" label-cols-sm="4" label="First name">
          <b-form-input v-model="appUser.first_name"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="12" label-cols-sm="4" label="Last name">
          <b-form-input v-model="appUser.last_name"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="12" label-cols-sm="4" label="E-Mail">
          <b-form-input v-model="appUser.email" readonly></b-form-input>
        </b-form-group>
        <b-form-group label-cols="12" label-cols-sm="4" label="Role">
          <b-form-input v-model="appUser.role" readonly></b-form-input>
        </b-form-group>
        <b-row class="float-right">
          <b-col>
            <b-button variant="primary" @click="updateProfile">Update</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" sm="4">
        <img
          v-b-tooltip.hover
          title="Click on the image to change your avatar"
          class="avatar"
          :src="avatarPath"
          @click="chooseAvatar"
        />
        <b-form-file
          @input="updateAvatar"
          v-model="image"
          id="fileChooser"
          class="mt-3 hidden"
          plain
        ></b-form-file>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data: function() {
    return {
      image: null
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("appuser/updateProfile", { vm: this });
    },
    updateAvatar() {
      this.$store.dispatch("appuser/updateAvatar", {
        vm: this,
        avatar: this.image
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
    },
    chooseAvatar() {
      var chooser = document.getElementById("fileChooser");
      chooser.click();
    }
  },
  computed: {
    ...mapState({
      appUser: state => state.appuser.appUser
    }),
    avatarPath() {
      return "/storage/" + this.appUser.avatar_filename;
    }
  }
};
</script>
<style scoped>
.avatar {
  padding: 5px;
  max-width: 15em;
  max-height: 15em;
}
.hidden {
  display: none;
}
</style>