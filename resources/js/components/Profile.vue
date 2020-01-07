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
        <img class="avatar" :src="avatarPath" @click="chooseAvatar" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  methods: {
    chooseAvatar() {
      console.log("choose your avatar!");
    }
  },
  computed: {
    ...mapState(["appUser"]),
    avatarPath() {
      return "/storage/" + this.appUser.avatar_filename;
    }
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.avatar {
  padding: 5px;
  max-width: 30em;
  max-height: 30em;
}
</style>