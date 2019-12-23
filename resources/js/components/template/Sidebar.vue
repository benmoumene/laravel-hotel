<template>
  <div>
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <span class="brand-text font-weight-light">Laravel Hotel</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
        </div>
        <div class="info">
          <a href="#" class="d-block">username</a>
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
          <li class="nav-item">
            <router-link to="/clients" class="nav-link">
              <i class="nav-icon fa fa-users"></i>
              Clients
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/billing" class="nav-link">
              <i class="nav-icon fa fa-file-invoice-dollar"></i>
              Billing
              <span class="right badge badge-danger">New</span>
            </router-link>
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
                  Pending Rooms
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/reservations" class="nav-link">
                  <i class="nav-icon fa fa-bed"></i>
                  Room Reservations
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/inventory" class="nav-link">
              <i class="nav-icon fa fa-shopping-cart"></i>
              Inventory
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/payments" class="nav-link">
              <i class="nav-icon fa fa-wallet"></i>
              Payments
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">
              <i class="nav-icon fa fa-hand-holding-usd"></i>
              Services
            </router-link>
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
            <router-link to="/logout" class="nav-link">
              <i class="nav-icon fa fa-sign-out-alt"></i>
              Logout
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  methods: {},
  computed: {},
  components: {},
  mounted() {}
};
</script>
<style scoped>
</style>