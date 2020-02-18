<template>
  <b-container fluid class="p-0">
    <b-row class="m-0">
      <b-col class="brand-link">
        <!-- Brand Logo -->
        <a href="#">
          <span class="brand-text font-weight-light">{{ setting('hotel_name') }}</span>
        </a>
      </b-col>
    </b-row>

    <b-row class="user-panel m-0">
      <b-col cols="8" class="pull-left info">
        <p>
          <router-link
            to="/profile"
            class="nav-link"
          >{{ appUser.first_name + ' ' + appUser.last_name }}</router-link>
        </p>
      </b-col>
      <b-col cols="4" class="pull-left image">
        <img v-if="avatarPath" :src="avatarPath" class="img-circle" alt="User Image" />
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
            <li class="nav-item">
              <router-link to="/customers" class="nav-link">
                <i class="nav-icon fa fa-users"></i>
                Customers
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reservations" class="nav-link">
                <i class="nav-icon fa fa-calendar-alt"></i>
                Reservations
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/rooms" class="nav-link">
                <i class="nav-icon fa fa-bed"></i>
                Rooms
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/services" class="nav-link">
                <i class="nav-icon fa fa-coffee"></i>
                Services
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/inventory" class="nav-link">
                <i class="nav-icon fa fa-shopping-cart"></i>
                Stock
                <span
                  v-if="hasLowStock"
                  class="badge badge-danger right"
                >Low Stock!</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/invoices" class="nav-link">
                <i class="nav-icon fa fa-file-invoice-dollar"></i>
                Invoices
                <span
                  class="right badge badge-danger"
                  v-b-tooltip.hover
                  title="Invoices still without payment"
                >{{ countPendingInvoices }}</span>
              </router-link>
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
      return this.$store.dispatch("appuser/logout");
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: "appuser/isAdmin",
      isRecepcionist: "appuser/isRecepcionist",
      isManager: "appuser/isManager",
      countPendingInvoices: "invoice/countPendingInvoices",
      setting: "setting/getSettingValue",
      inventory: "inventory/getItems",
      appReady: "appReady"
    }),
    ...mapState({
      appUser: state => state.appuser.appUser
    }),
    avatarPath() {
      if (this.appReady && this.appUser.avatar_filename != null) {
        return "/storage/" + this.appUser.avatar_filename;
      }
    },
    hasLowStock() {
      for (var item of this.inventory) {
        if (item.quantity < item.min_stock) {
          return true;
        }
      }
      return false;
    }
  }
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