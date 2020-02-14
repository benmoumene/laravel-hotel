<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col sm="6" class="my-1">
        <b-form-group
          label="Status"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select v-model="onStatus" id="perPageSelect" size="sm" :options="statusOptions"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="current_guests">Current Guests</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="filteredReservations"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(first_name)="row">{{ row.item.customer.first_name }}</template>
      <template v-slot:cell(last_name)="row">{{ customer(row.item.customer_id).last_name }}</template>
      <template v-slot:cell(room_name)="row">
        <router-link
          :to="{path: '/room/' + row.item.room_id +'/edit'}"
        >{{ room(row.item.room_id).name }}</router-link>
      </template>
      <template v-slot:cell(actions)="{item}">
        <b-button
          v-b-tooltip.hover
          title="Customer details"
          size="sm"
          variant="info"
          @click="customerInfo(item.customer.id)"
        >
          <i class="fa fa-user"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Reservation details"
          size="sm"
          variant="info"
          @click="reservationInfo(item.id)"
        >
          <i class="fa fa-calendar-alt"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Room details"
          size="sm"
          variant="info"
          @click="roomInfo(item.room_id)"
        >
          <i class="fa fa-bed"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Services"
          size="sm"
          variant="success"
          @click="billingInfo(item.id)"
        >
          <i class="nav-icon fa fa-coffee"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Invoice"
          size="sm"
          variant="success"
          @click="invoiceInfo(item.invoice.id)"
        >
          <i class="nav-icon fa fa-file-invoice-dollar"></i>
        </b-button>
      </template>
    </b-table>

    <b-modal id="room-modal" size="xl" centered title="Room Info" hide-footer>
      <room-info :roomId="roomId" :readonly="true"></room-info>
    </b-modal>
    <b-modal id="customer-modal" size="xl" centered title="Customer Info" hide-footer>
      <customer-info :customerId="customerId" :readonly="true"></customer-info>
    </b-modal>
    <b-modal id="reservation-modal" size="xl" centered title="Reservation Info" hide-footer>
      <reservation :reservationId="reservationId" :readonly="false" />
    </b-modal>
    <b-modal id="billed-services-modal" size="xl" centered title="Billed Services" hide-footer>
      <billed-service-add :reservationId="reservationId" :readonly="true" />
      <billed-services :reservationId="reservationId" :readonly="true" />
    </b-modal>
    <b-modal id="invoice-modal" size="xl" centered title="Invoice Info" hide-footer>
      <invoice-edit :id="invoiceId" :readonly="true" />
    </b-modal>
  </b-container>
</template>
<script>
// Implementar filtro de fechas por defecto en RESERVATION LIST.
import { mapState, mapGetters } from "vuex";
import Room from "../rooms/Room";
import InvoiceEdit from "../invoices/InvoiceEdit";
import BilledServiceAdd from "../billed-services/BilledServiceAdd";
import BilledServices from "../billed-services/BilledServices";
import ReservationEdit from "./ReservationEdit";
import Customer from "../customers/Customer";
export default {
  name: "ReservationList",
  data: function() {
    return {
      fields: [
        {
          key: "first_name",
          label: "First Name"
        },
        {
          key: "last_name",
          label: "Last Name"
        },
        {
          key: "room_name",
          label: "Room"
        },
        {
          key: "status",
          label: "status",
          sortable: true
        },
        {
          key: "from_date",
          label: "From",
          sortable: true
        },
        {
          key: "to_date",
          label: "To",
          sortable: true
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 20,
      statusOptions: ["all", "active", "cancelled", "expired"],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      onStatus: "active",
      filteredRows: null,
      filterOn: [],
      roomId: null,
      guestId: null,
      reservationId: null,
      customerId: null,
      invoiceId: null,
      selectedReservation: null
    };
  },
  methods: {
    reservationInfo(id) {
      //this.selectedReservation = reservation;
      this.reservationId = id;
      this.$bvModal.show("reservation-modal");
    },
    roomInfo(id) {
      this.roomId = id;
      this.$bvModal.show("room-modal");
    },
    invoiceInfo(id) {
      this.invoiceId = id;
      this.$bvModal.show("invoice-modal");
    },
    billingInfo(reservation_id) {
      this.reservationId = reservation_id;
      this.$bvModal.show("billed-services-modal");
    },
    customerInfo(id) {
      this.customerId = id;
      this.$bvModal.show("customer-modal");
    },
    onFiltered(filteredItems) {
      this.currentPage = 1;
      this.filteredRows = filteredItems.length;
    },
    customer(id) {
      return this.getCustomer(id);
    },
    room(id) {
      return this.getRoom(id);
    },
    cancelReservation(reservation) {
      this.$store.dispatch("reservation/cancel", {
        vm: this,
        reservation
      });
    },
    makeToast(title, message, variant = "info") {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        appendToast: true
      });
    }
  },
  computed: {
    ...mapState({
      reservations: state => state.reservation.reservations
    }),
    ...mapGetters({
      isCurrentGuest: "guest/isCurrentGuest",
      getCustomer: "customer/getCustomer",
      getRoom: "room/getRoom",
      getGuest: "guest/getGuest",
      getInvoice: "billing/getInvoiceFromReservation"
    }),
    filteredReservations() {
      let newArray = [];
      for (const reservation of this.reservations) {
        reservation.customer = this.getCustomer(reservation.customer_id);
        reservation.room = this.getRoom(reservation.room_id);
        reservation.guest = this.getGuest(reservation.guest.id);
        reservation.invoice = this.getInvoice(reservation.id);
        newArray.push(reservation);
      }

      if (this.onStatus === "all") {
        return newArray;
      }

      if (this.filterOn.indexOf("current_guests") > -1) {
        newArray = newArray.filter(reservation =>
          this.isCurrentGuest(reservation.customer_id)
        );
      }

      return newArray.filter(
        reservation => reservation.status === this.onStatus
      );
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    totalRows() {
      if (this.filteredRows !== null) {
        return this.filteredRows;
      }
      return this.filteredReservations.length;
    }
  },
  components: {
    "room-info": Room,
    "customer-info": Customer,
    "invoice-edit": InvoiceEdit,
    "billed-service-add": BilledServiceAdd,
    "billed-services": BilledServices,
    reservation: ReservationEdit
  }
};
</script>