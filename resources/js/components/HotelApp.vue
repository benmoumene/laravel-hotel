<template>
  <b-container fluid class="p-0 wrapper">
    <navbar></navbar>

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <sidebar></sidebar>
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </section>
    </div>

    <footer class="main-footer">
      <div>
        <strong>
          Copyright &copy; 2014-2019
          <a href="http://adminlte.io">AdminLTE.io</a>.
        </strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.0.2-pre
        </div>
      </div>
    </footer>
    <!-- ./wrapper -->
  </b-container>
</template>
<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
export default {
  name: "HotelApp",
  components: {
    sidebar: Sidebar,
    navbar: Navbar
  },
  beforeCreate() {
    this.$store.dispatch("fetchData");
  }
};
</script>
<style scoped>
.content-wrapper {
  padding-top: 20px;
  padding-bottom: 5px;
}
</style>