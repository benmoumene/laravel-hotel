<template>
  <b-container fluid>
    <b-row>
      <b-col cols="8">
        <b-row>
          <strong>Username:</strong>
          <span>{{ appUser.name }}</span>
        </b-row>
        <b-row>
          <strong>First Name:</strong>
          <span>{{ appUser.first_name }}</span>
        </b-row>
        <b-row>
          <strong>Last Name:</strong>
          <span>{{ appUser.last_name }}</span>
        </b-row>
        <b-row>
          <strong>Email:</strong>
          <span>{{ appUser.email }}</span>
        </b-row>
        <b-row>
          <strong>Role:</strong>
          <span>{{ appUser.role }}</span>
        </b-row>
      </b-col>
      <b-col cols="4">
        <b-row>
          <img class="avatar" :src="avatarPath" @click="chooseAvatar" />
          <b-form-file v-model="image" id="fileChooser" class="mt-3 hidden" plain></b-form-file>
        </b-row>
        <b-row>
          <b-button variant="success" @click="uploadAvatar">UPLOAD</b-button>
        </b-row>
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
    },
    uploadAvatar() {
      if (this.image !== null) {
        this.$store.dispatch("uploadAvatar", { vm: this, avatar: this.image });
      }
    }
  },
  computed: {
    ...mapState(["appUser"]),
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