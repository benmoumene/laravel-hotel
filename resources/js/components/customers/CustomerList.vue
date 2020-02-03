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
        <router-link :to="{path: row.item.id +'/edit'}">
          <b-button>Edit</b-button>
        </router-link>
        <router-link :to="{path: '/reservations/' + row.item.id +'/show'}">
          <b-button>Reservations</b-button>
        </router-link>
        <router-link :to="{path: '/reservations/' + row.item.id +'/show'}">
          <b-button>Invoices</b-button>
        </router-link>
      </template>
    </b-table>

    <b-modal id="modal-center" centered title="Customer Info">
      <customer-info
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
  </b-container>
</template>
<script>
import { mapState } from "vuex";
import CustomerInfo from "./CustomerInfo";
export default {
  name: "CustomerList",
  data: function() {
    return {
      selectedCustomer: {},
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
      this.$bvModal.show("modal-center");
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
    "customer-info": CustomerInfo
  }
};
</script>
<style scoped>
</style>