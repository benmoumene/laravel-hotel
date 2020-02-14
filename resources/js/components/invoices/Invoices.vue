<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="4" class="my-1">
        <b-form-group
          label="Rows"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="4" class="my-1">
        <b-form-group
          label="Status"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="status"
            @change="onFilter"
            id="perPageSelect"
            size="sm"
            :options="statusOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="4" class="my-1">
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
      :items="filteredInvoices"
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
      <template v-slot:cell(status)="row">
        <b-badge :variant="row.item.status == 'paid' ? 'success' : 'danger'">{{ row.item.status }}</b-badge>
      </template>
      <template v-slot:cell(actions)="row">
        <router-link :to="{path: '/invoices/' + row.item.id +'/edit'}">
          <b-button variant="info" size="sm">Show</b-button>
        </router-link>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Invoices",
  data: function() {
    return {
      fields: [
        {
          key: "total",
          label: "Total",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "generated_on",
          label: "Generated On",
          sortable: true,
          class: "text-center"
        },

        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      status: "pending",
      statusOptions: ["all", "pending", "paid"],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: ["status"]
    };
  },
  methods: {
    countRows() {
      return this.filteredInvoices.length;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onFilter() {
      this.totalRows = this.countRows();
      this.currentPage = 1;
    }
  },
  computed: {
    //...mapState(["billing/invoices"]),
    ...mapState({
      invoices: state => state.billing.invoices
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
    filteredInvoices() {
      if (this.status === "all") {
        return this.invoices;
      }
      return this.invoices.filter(invoice => invoice.status === this.status);
    }
  },
  mounted() {},
  updated() {}
};
</script>
<style scoped>
</style>