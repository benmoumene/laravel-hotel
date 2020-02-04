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
      <b-col sm="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="name">Only Guests</b-form-checkbox>
            <b-form-checkbox value="age">Pending Invoices</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="customers"
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
        <template v-slot:cell(actions)="row">
          <b-button variant="info" @click="showCustomerInfo(row.item)">+Info</b-button>
          <b-button variant="info" @click="showReservations(row.item)">Reservations</b-button>
          <b-button variant="info" @click="showInvoices(row.item)">Invoices</b-button>
          <b-button
            v-if="isCurrentGuest(row.item.id)"
            variant="info"
            @click="showGuestInfo(row.item)"
          >Guest</b-button>
        </template>
      </b-table>
    </b-row>

    <b-modal id="customer-info-modal" centered title="Customer Info" hide-footer>
      <customer-info
        :id="selectedCustomer.id"
        :first_name="selectedCustomer.first_name"
        :last_name="selectedCustomer.last_name"
        :address="selectedCustomer.address"
        :phone="selectedCustomer.phone"
        :sex="selectedCustomer.sex"
        :document_id="selectedCustomer.document_id"
        :document_id_type="selectedCustomer.document_id_type"
        :nationality="selectedCustomer.nationality"
      ></customer-info>
    </b-modal>

    <b-modal id="guest-info-modal" centered title="Guest Info">
      <guest-info
        :room_name="selectedGuest.check_in"
        :check_in="selectedGuest.check_in"
        :check_out="selectedGuest.check_out"
      ></guest-info>
    </b-modal>

    <b-modal id="reservations-modal" size="xl" centered title="Reservations" hidden-footer>
      <customer-reservations :reservations="customerReservations(selectedCustomer.id)"></customer-reservations>
    </b-modal>

    <b-modal id="invoices-modal" size="xl" centered title="Invoices" hidden-footer>
      <customer-invoices :invoices="customerInvoices(selectedCustomer.id)"></customer-invoices>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CustomerInfo from "./CustomerInfo";
import CustomerInvoices from "./CustomerInvoices";
import CustomerReservations from "./CustomerReservations";
import GuestInfo from "./CustomerGuestInfo";
export default {
  name: "CustomerList",
  data: function() {
    return {
      selectedCustomer: {},
      selectedGuest: {},
      fields: [
        {
          key: "first_name",
          label: "First Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "last_name",
          label: "Last Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "phone",
          label: "phone",
          sortable: true,
          class: "text-center"
        },
        {
          key: "document_id",
          label: "Document Id",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  methods: {
    showCustomerInfo(customer) {
      this.selectedCustomer = customer;
      this.$bvModal.show("customer-info-modal");
    },
    showGuestInfo(customer) {
      this.selectedCustomer = customer;
      this.selectedGuest = this.getGuest(customer.id);
      this.$bvModal.show("guest-info-modal");
    },
    showReservations(customer) {
      this.selectedCustomer = customer;
      this.$bvModal.show("reservations-modal");
    },
    showInvoices(customer) {
      this.selectedCustomer = customer;
      this.$bvModal.show("invoices-modal");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentPage = 1;
    }
  },
  computed: {
    ...mapState({
      customers: state => state.customer.customers
    }),
    ...mapGetters({
      isCurrentGuest: "guest/isCurrentGuest",
      getGuest: "guest/getGuest",
      customerInvoices: "billing/getCustomerInvoices",
      customerReservations: "reservation/getCustomerReservations"
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    totalRows() {
      return this.customers.length;
    }
  },
  mounted() {},
  updated() {},
  components: {
    "customer-info": CustomerInfo,
    "guest-info": GuestInfo,
    "customer-reservations": CustomerReservations,
    "customer-invoices": CustomerInvoices
  }
};
</script>
<style scoped>
</style>