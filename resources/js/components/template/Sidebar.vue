<template>
  <b-container fluid class="p-0">
    <b-row class="m-0">
      <b-col class="brand-link">
        <!-- Brand Logo -->
        <a href="#">
          <span class="brand-text font-weight-light">Laravel Hotel</span>
        </a>
      </b-col>
    </b-row>

    <b-row class="user-panel m-0">
      <b-col cols="4" class="pull-left image">
        <img :src="avatarPath" class="img-circle" alt="User Image" />
      </b-col>
      <b-col cols="8" class="pull-left info">
        <p>
          <router-link
            to="/profile"
            class="nav-link"
          >{{ appUser.first_name + ' ' + appUser.last_name }}</router-link>
        </p>
      </b-col>
    </b-row>

    <!-- Sidebar -->
    <b-row class="sidebar m-0">
      <b-col class="p-0">
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact>
                <i class="nav-icon fa fa-tachometer-alt"></i>
                Dashboard
              </router-link>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-users"></i>
                <p>
                  Customers
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/customer/add" class="nav-link">
                    <i class="nav-icon fa fa-user-plus"></i>
                    Add Customer
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/customer/list" class="nav-link">
                    <i class="nav-icon fa fa-search"></i>
                    Customer List
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview" v-if="isAdmin || isManager">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-bed"></i>
                <p>
                  Rooms
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/room/add" class="nav-link">
                    <i class="nav-icon fa fa-bed"></i>
                    Add Room
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/room/list" class="nav-link">
                    <i class="nav-icon fa fa-search"></i>
                    Room List
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/guest/list" class="nav-link">
                    <i class="nav-icon fa fa-edit"></i>
                    Guests
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/rooms/availability" class="nav-link">
                    <i class="nav-icon fa fa-bed"></i>
                    Availability
                    <span class="badge badge-info right">6</span>
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview" v-if="isRecepcionist || isAdmin">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-bed"></i>
                <p>
                  Reservations
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/reservations" class="nav-link">
                    <i class="nav-icon fa fa-bed"></i>
                    Manage Reservations
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/reservations" class="nav-link">
                    <i class="nav-icon fa fa-bed"></i>
                    New Reservation
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
                  <router-link to="/services/add" class="nav-link">
                    <i class="nav-icon fa fa-hand-holding-usd"></i>
                    Add Service
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/services/list" class="nav-link">
                    <i class="nav-icon fa fa-hand-holding-usd"></i>
                    Show Services
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
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/inventory/add" class="nav-link">
                    <i class="nav-icon fa fa-shopping-cart"></i>
                    Add Item
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/inventory/list" class="nav-link">
                    <i class="nav-icon fa fa-shopping-cart"></i>
                    Inventory Items
                    <span
                      class="badge badge-danger right"
                    >Low Stock!</span>
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview" v-if="isManager || isAdmin">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-wallet"></i>
                <p>
                  Billing
                  <i class="fa fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/billing" class="nav-link">
                    <i class="nav-icon fa fa-file-invoice-dollar"></i>
                    Invoices List
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

            <li class="nav-item" v-if="isAdmin">
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
      </b-col>
    </b-row>
    <!-- /.sidebar -->
  </b-container>
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
    ...mapGetters(["isAdmin", "isRecepcionist", "isManager"]),
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
.nav-treeview li {
  padding-left: 10px;
}
.user-panel img {
  padding: 0.4rem;
  width: 100%;
}

nav .nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #fff;
}
</style>