<template>
  <b-container fluid>
    <b-row>
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-success">
          <div class="inner">
            <h3>{{ countGuests }}</h3>

            <p>Guests</p>
          </div>
          <div class="icon">
            <i class="fa fa-users"></i>
          </div>
          <router-link :to="{path: '/reservations'}" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </router-link>
        </div>
      </div>
      <!-- ./col -->
      <!-- ./col -->
      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>{{ countPendingInvoices }}</h3>
            <p>Pending Invoices</p>
          </div>
          <div class="icon">
            <i class="nav-icon fa fa-file-invoice-dollar"></i>
          </div>
          <router-link :to="{path: '/invoices'}" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </router-link>
        </div>
      </div>
      <!-- ./col -->

      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{{ countReservations }}</h3>
            <p>Reservations</p>
          </div>
          <div class="icon">
            <i class="nav-icon fa fa-hand-holding-usd"></i>
          </div>
          <router-link :to="{path: '/reservations'}" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </router-link>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>{{ countMaintenanceRooms }}</h3>
            <p>Rooms on Maintenance</p>
          </div>
          <div class="icon">
            <i class="nav-icon fa fa-bed"></i>
          </div>
          <router-link :to="{path: '/rooms'}" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </router-link>
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  methods: {},
  computed: {
    ...mapGetters({
      rooms: "room/getRooms",
      guests: "guest/getGuests",
      invoices: "invoice/getInvoices",
      reservations: "reservation/getReservations"
    }),
    countMaintenanceRooms() {
      var maintenanceRooms = this.rooms.filter(
        //room => room.status === "maintenance"
        room => room.floor === "2F"
      );
      return maintenanceRooms.length;
    },
    countGuests() {
      return this.guests.filter(
        guest => guest.check_in !== null && guest.check_out === null
      ).length;
    },
    countReservations() {
      return this.reservations.filter(
        reservation => reservation.status === "active"
      ).length;
    },
    countPendingInvoices() {
      var invoices = this.invoices.filter(
        invoice => invoice.status === "pending"
      );
      return invoices.length;
    }
  }
};
</script>