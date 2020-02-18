<template>
  <b-container fluid class="p-0 wrapper">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#">
            <i class="fa fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/" class="nav-link" exact>Dashboard</router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/about" class="nav-link" exact>About</router-link>
        </li>
      </ul>
    </nav>

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
import Sidebar from "./Sidebar";
export default {
  name: "HotelApp",
  components: {
    sidebar: Sidebar
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