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

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="items"
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
      <template v-slot:cell(customer.first_name)="item">{{ item.value }}</template>
      <template v-slot:cell(customer.last_name)="item">{{ item.value }}</template>

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
          @click="reservationInfo(item.reservation_id)"
        >
          <i class="fa fa-calendar-alt"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Room details"
          size="sm"
          variant="info"
          @click="roomInfo(item.room.id)"
        >
          <i class="fa fa-bed"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Services"
          size="sm"
          variant="success"
          @click="billingInfo(item.reservation_id)"
        >
          <i class="nav-icon fa fa-coffee"></i>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Invoice"
          size="sm"
          variant="success"
          @click="invoiceInfo(item.reservation_id)"
        >
          <i class="nav-icon fa fa-file-invoice-dollar"></i>
        </b-button>
      </template>
    </b-table>
    <b-modal id="room-modal" size="xl" centered title="Room Info" hide-footer>
      <room-info :roomId="selectedRoomId" :readonly="true"></room-info>
    </b-modal>
    <b-modal id="customer-modal" size="xl" centered title="Customer Info" hide-footer>
      <customer-info :customerId="selectedCustomerId" :readonly="true"></customer-info>
    </b-modal>
    <b-modal id="reservation-modal" size="xl" centered title="Reservation Info" hide-footer>
      <reservation-info :reservationId="selectedReservationId" :readonly="true"></reservation-info>
    </b-modal>
    <b-modal id="billing-modal" size="xl" centered title="Billing Info" hide-footer>
      <billed-info :reservationId="reservationId" :readonly="true" />
    </b-modal>
    <b-modal id="invoice-modal" size="xl" centered title="Invoice Info" hide-footer>
      <invoice-info :invoiceId="invoiceId" :readonly="true"></invoice-info>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Room from "../rooms/Room";
import Invoice from "../billing/Invoice";
import BilledServices from "../billing/BilledServices";
import Reservation from "../reservations/Reservation";
import Customer from "../customers/Customer";
export default {
  name: "GuestList",
  data: function() {
    return {
      invoiceId: null,
      reservationId: null,
      selectedRoomId: null,
      selectedCustomerId: null,
      selectedReservationId: null,
      fields: [
        {
          key: "customer.first_name",
          label: "First Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "customer.last_name",
          label: "Last Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "room.name",
          label: "Room Name",
          sortable: true
        },
        {
          key: "check_in",
          label: "Check in",
          sortable: true
        },
        {
          key: "check_out",
          label: "Check Out",
          sortable: true
        },
        { key: "actions", label: "Actions" }
      ],
      items: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      totalRows: null,
      filterOn: []
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.currentPage = 1;
      this.totalRows = filteredItems.length;
    },
    reservationInfo(id) {
      this.selectedReservationId = id;
      this.$bvModal.show("reservation-modal");
    },
    roomInfo(id) {
      this.selectedRoomId = id;
      this.$bvModal.show("room-modal");
    },
    invoiceInfo(reservation_id) {
      this.invoiceId = this.getInvoice(reservation_id).id;
      this.$bvModal.show("invoice-modal");
    },
    billingInfo(reservation_id) {
      this.reservationId = reservation_id;
      this.$bvModal.show("billing-modal");
    },
    customerInfo(id) {
      this.selectedCustomerId = id;
      this.$bvModal.show("customer-modal");
    }
  },
  computed: {
    ...mapState({
      guests: state => state.guest.guests
    }),
    ...mapGetters({
      getCustomer: "customer/getCustomer",
      getInvoice: "billing/getInvoiceFromReservation",
      getRoom: "room/getRoom"
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    guestNormalized() {
      let newArray = [];

      for (const guest of this.guests) {
        guest.customer = this.getCustomer(guest.customer.id);
        guest.room = this.getRoom(guest.room.id);
        newArray.push(guest);
      }
      return newArray;
    }
  },
  mounted() {
    this.items = this.guestNormalized;
    this.totalRows = this.items.length;
  },
  watch: {
    guestNormalized: function(val) {
      this.items = this.guestNormalized;
      this.totalRows = this.items.length;
    }
  },
  components: {
    "room-info": Room,
    "customer-info": Customer,
    "invoice-info": Invoice,
    "billed-info": BilledServices,
    "reservation-info": Reservation
  }
};
</script>