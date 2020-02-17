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
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="current_guests">Current Guests</b-form-checkbox>
            <b-form-checkbox value="pending_invoices">Pending Invoices</b-form-checkbox>
          </b-form-checkbox-group>
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
      <b-col sm="6" class="my-1 text-right">
        <b-button v-b-modal.new-customer-modal variant="primary">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>

    <b-row>
      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="filteredCustomers"
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
          <b-button
            v-b-tooltip.hover
            title="Customer details"
            size="sm"
            variant="primary"
            @click="showCustomerInfo(row.item)"
          >
            <i class="fa fa-user"></i>
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Customer reservations"
            size="sm"
            variant="primary"
            @click="showReservations(row.item)"
          >
            <i class="fa fa-calendar-alt"></i>
          </b-button>

          <b-button
            v-b-tooltip.hover
            title="Customer invoices"
            size="sm"
            variant="primary"
            @click="showInvoices(row.item)"
          >
            <i class="nav-icon fa fa-file-invoice-dollar"></i>
          </b-button>
        </template>
      </b-table>
    </b-row>

    <b-modal id="customer-edit-modal" size="xl" centered title="Customer Info" hide-footer>
      <customer-edit :customerId="selectedCustomer.id" :readonly="false"></customer-edit>
    </b-modal>

    <b-modal
      id="reservations-modal"
      size="xl"
      centered
      :title="'Reservations from ' 
      + selectedCustomer.first_name + ' '
      + selectedCustomer.last_name"
      hide-footer
    >
      <customer-reservations
        :customer_id="selectedCustomer.id"
        :reservations="customerReservations(selectedCustomer.id)"
      ></customer-reservations>
    </b-modal>

    <b-modal id="invoices-modal" size="xl" centered title="Invoices" hide-footer>
      <customer-invoices :customerId="selectedCustomer.id"></customer-invoices>
    </b-modal>

    <b-modal id="new-customer-modal" size="xl" centered title="New customer" hide-footer>
      <new-customer></new-customer>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import CustomerEdit from "./CustomerEdit";
import CustomerAdd from "./CustomerAdd";
import CustomerInvoices from "./CustomerInvoices";
import CustomerReservations from "./CustomerReservations";
export default {
  name: "CustomerList",
  data: function() {
    return {
      selectedCustomer: {},
      selectedGuestId: 0,
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
      filteredRows: null,
      filterOn: ["first_name", "last_name", "phone", "document_id"]
    };
  },
  methods: {
    showCustomerInfo(customer) {
      console.log(customer.id);
      console.log(customer.first_name);
      this.selectedCustomer = customer;
      this.$bvModal.show("customer-edit-modal");
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
      this.filteredRows = filteredItems.length;
    }
  },
  computed: {
    ...mapGetters({
      isCurrentGuest: "guest/isCurrentGuest",
      customerInvoices: "invoice/getCustomerInvoices",
      hasPendingInvoices: "invoice/hasPendingInvoices",
      getGuest: "guest/getGuestWithCustomerId",
      customers: "customer/getCustomers",
      customerReservations: "reservation/getCustomerReservations"
    }),
    filteredCustomers() {
      var filteredCustomers = this.customers;
      if (this.filterOn.indexOf("current_guests") > -1) {
        filteredCustomers = filteredCustomers.filter(customer =>
          this.isCurrentGuest(customer.id)
        );
      }

      if (this.filterOn.indexOf("pending_invoices") > -1) {
        filteredCustomers = filteredCustomers.filter(customer =>
          this.hasPendingInvoices(customer.id)
        );
      }

      return filteredCustomers;
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
      return this.filteredCustomers.length;
    }
  },
  components: {
    "customer-edit": CustomerEdit,
    "new-customer": CustomerAdd,
    "customer-reservations": CustomerReservations,
    "customer-invoices": CustomerInvoices
  }
};
</script>