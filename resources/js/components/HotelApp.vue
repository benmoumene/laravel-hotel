<template>
  <b-container fluid class="p-0 wrapper">
    <navbar></navbar>

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <sidebar></sidebar>
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12">
              <h1 class="m-0 text-dark">{{ $route.meta.title }}</h1>
            </div>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </section>
    </div>

    <footer class="main-footer">
      <myfooter></myfooter>
    </footer>
    <!-- ./wrapper -->
  </b-container>
</template>
<script>
import Navbar from "./template/Navbar";
import Sidebar from "./template/Sidebar";
import Footer from "./template/Footer";
export default {
  name: "HotelApp",
  computed: {
    getRouterTitle: function() {
      return this.$route.title;
    },
    getRouterName: function() {
      return this.$route.name;
    }
  },
  components: {
    sidebar: Sidebar,
    myfooter: Footer,
    navbar: Navbar
  },
  beforeCreate() {
    this.$store.dispatch("fetchData");
  }
};
</script>
<style scoped>
.content-wrapper {
  padding-bottom: 1px;
}
</style>