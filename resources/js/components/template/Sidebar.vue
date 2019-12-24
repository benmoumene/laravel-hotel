<template>
  <div>
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <span class="brand-text font-weight-light">Laravel Hotel</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 mb-3 d-flex">
        <div class="info">
          <router-link to="/profile" class="nav-link">Welcome, {{ appUser.name }}</router-link>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fa fa-tachometer-alt"></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-users"></i>
              <p>
                Guests
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/guest-add" class="nav-link">
                  <i class="nav-icon fa fa-user-plus"></i>
                  New Guest
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/guest-edit" class="nav-link">
                  <i class="nav-icon fa fa-edit"></i>
                  Manage Guests
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-bed"></i>
              <p>
                Manage Rooms
                <i class="fa fa-angle-left right"></i>
                <span class="badge badge-info right">6</span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/rooms" class="nav-link">
                  <i class="nav-icon fa fa-bed"></i>
                  Add Room
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/rooms" class="nav-link">
                  <i class="nav-icon fa fa-bed"></i>
                  Edit Room
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/reservations" class="nav-link">
                  <i class="nav-icon fa fa-bed"></i>
                  Reservations
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-hand-holding-usd"></i>
              <p>
                Manage Services
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/services" class="nav-link">
                  <i class="nav-icon fa fa-hand-holding-usd"></i>
                  Add Service
                </router-link>
              </li>

              <li class="nav-item">
                <router-link to="/services" class="nav-link">
                  <i class="nav-icon fa fa-hand-holding-usd"></i>
                  Edit Service
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-shopping-cart"></i>
              <p>
                Inventory
                <i class="fa fa-angle-left right"></i>
                <span class="badge badge-danger right">Low Stock!</span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/inventory" class="nav-link">
                  <i class="nav-icon fa fa-shopping-cart"></i>
                  Stock
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/inventory" class="nav-link">
                  <i class="nav-icon fa fa-shopping-cart"></i>
                  Inventory
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fa fa-wallet"></i>
              <p>
                Manage Payments
                <i class="fa fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/billing" class="nav-link">
                  <i class="nav-icon fa fa-file-invoice-dollar"></i>
                  Billing
                  <span class="right badge badge-danger">New</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/billing" class="nav-link">
                  <i class="nav-icon fa fa-file-invoice-dollar"></i>
                  Pending Invoices
                  <span class="right badge badge-danger">6</span>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/settings" class="nav-link">
              <i class="nav-icon fa fa-wrench"></i>
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              <i class="nav-icon fa fa-info"></i>
              About us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <i class="nav-icon fa fa-user"></i>
              Profile
            </router-link>
          </li>

          <li class="nav-item">
            <a href="#" @click.prevent="logout()" class="nav-link">
              <i class="nav-icon fa fa-sign-out-alt"></i>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "Sidebar",
  methods: {
    logout() {
      return this.$store.dispatch("logout");
    }
  },
  computed: {
    ...mapState(["appUser"])
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.nav-treeview li {
  padding-left: 20px;
}
</style>