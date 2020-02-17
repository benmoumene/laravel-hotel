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
          <a href="#" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </a>
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
          <router-link :to="{path: '/billing/list'}" class="small-box-footer">
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
          <a href="#" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </a>
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
          <a href="#" class="small-box-footer">
            More info
            <i class="fa fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>
    </b-row>

    <b-row>
      <div class="col-md-12">
        <div class="card bg-gradient-success">
          <div class="card-header">
            <h5 class="card-title">Monthly Recap Report</h5>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>
              <div class="btn-group">
                <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                  <i class="fas fa-wrench"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" role="menu">
                  <a href="#" class="dropdown-item">Action</a>
                  <a href="#" class="dropdown-item">Another action</a>
                  <a href="#" class="dropdown-item">Something else here</a>
                  <a class="dropdown-divider"></a>
                  <a href="#" class="dropdown-item">Separated link</a>
                </div>
              </div>
              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <p class="text-center">
                  <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                </p>

                <div class="chart">
                  <!-- Sales Chart Canvas -->
                  <canvas id="salesChart" height="180" style="height: 180px;"></canvas>
                </div>
                <!-- /.chart-responsive -->
              </div>
              <!-- /.col -->
              <div class="col-md-4">
                <p class="text-center">
                  <strong>Goal Completion</strong>
                </p>

                <div class="progress-group">
                  Add Products to Cart
                  <span class="float-right">
                    <b>160</b>/200
                  </span>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-primary" style="width: 80%"></div>
                  </div>
                </div>
                <!-- /.progress-group -->

                <div class="progress-group">
                  Complete Purchase
                  <span class="float-right">
                    <b>310</b>/400
                  </span>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-danger" style="width: 75%"></div>
                  </div>
                </div>

                <!-- /.progress-group -->
                <div class="progress-group">
                  <span class="progress-text">Visit Premium Page</span>
                  <span class="float-right">
                    <b>480</b>/800
                  </span>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-success" style="width: 60%"></div>
                  </div>
                </div>

                <!-- /.progress-group -->
                <div class="progress-group">
                  Send Inquiries
                  <span class="float-right">
                    <b>250</b>/500
                  </span>
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-warning" style="width: 50%"></div>
                  </div>
                </div>
                <!-- /.progress-group -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <!-- ./card-body -->
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-success">
                    <i class="fas fa-caret-up"></i> 17%
                  </span>
                  <h5 class="description-header">$35,210.43</h5>
                  <span class="description-text">TOTAL REVENUE</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-warning">
                    <i class="fas fa-caret-left"></i> 0%
                  </span>
                  <h5 class="description-header">$10,390.90</h5>
                  <span class="description-text">TOTAL COST</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-3 col-6">
                <div class="description-block border-right">
                  <span class="description-percentage text-success">
                    <i class="fas fa-caret-up"></i> 20%
                  </span>
                  <h5 class="description-header">$24,813.53</h5>
                  <span class="description-text">TOTAL PROFIT</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-3 col-6">
                <div class="description-block">
                  <span class="description-percentage text-danger">
                    <i class="fas fa-caret-down"></i> 18%
                  </span>
                  <h5 class="description-header">1200</h5>
                  <span class="description-text">GOAL COMPLETIONS</span>
                </div>
                <!-- /.description-block -->
              </div>
            </div>
            <!-- /.row -->
          </div>
          <!-- /.card-footer -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.col -->
    </b-row>

    <b-row>
      <!-- Calendar -->
      <b-col cols="6">
        <div class="card bg-gradient-success">
          <div class="card-header border-0">
            <h3 class="card-title">
              <i class="far fa-calendar-alt"></i>
              Calendar
            </h3>
            <!-- tools card -->
            <div class="card-tools">
              <!-- button with a dropdown -->
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-success btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="fas fa-bars"></i>
                </button>
                <div class="dropdown-menu float-right" role="menu">
                  <a href="#" class="dropdown-item">Add new event</a>
                  <a href="#" class="dropdown-item">Clear events</a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">View calendar</a>
                </div>
              </div>
              <button type="button" class="btn btn-success btn-sm" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="btn btn-success btn-sm" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <!-- /. tools -->
          </div>
          <!-- /.card-header -->
          <div class="card-body pt-0">
            <!--The calendar -->
            <div id="calendar" style="width: 100%"></div>
          </div>
          <!-- /.card-body -->
        </div>
      </b-col>
      <!-- /.card -->

      <b-col cols="6">
        <div class="info-box mb-3 bg-warning">
          <span class="info-box-icon">
            <i class="fas fa-tag"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Inventory</span>
            <span class="info-box-number">5,200</span>
          </div>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
        <div class="info-box mb-3 bg-success">
          <span class="info-box-icon">
            <i class="far fa-heart"></i>
          </span>

          <div class="info-box-content">
            <span class="info-box-text">Mentions</span>
            <span class="info-box-number">92,050</span>
          </div>
          <!-- /.info-box-content -->
        </div>
      </b-col>
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
      return this.guests.length;
    },
    countReservations() {
      return this.reservations.length;
    },
    countPendingInvoices() {
      var invoices = this.invoices.filter(
        invoice => invoice.status === "pending"
      );
      return invoices.length;
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>