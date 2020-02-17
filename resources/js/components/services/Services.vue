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
      <b-col sm="7" md="6" class="my-1 text-right">
        <b-button v-b-modal.service-modal variant="primary">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="services"
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
      <template v-slot:cell(name)="row">
        <b-form-input v-model="row.item.name"></b-form-input>
      </template>

      <template v-slot:cell(cost)="row">
        <b-form-input v-model="row.item.cost"></b-form-input>
      </template>

      <template v-slot:cell(comments)="row">
        <b-form-input v-model="row.item.comments"></b-form-input>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="updateService(row.item)">Update</b-button>
      </template>
    </b-table>

    <b-modal id="service-modal" size="md" centered title="New service" hide-footer>
      <new-service></new-service>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import ServiceAdd from "./ServiceAdd";
export default {
  name: "Services",
  data: function() {
    return {
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "cost",
          label: "Cost",
          sortable: false,
          sortDirection: "desc"
        },
        {
          key: "comments",
          label: "Comment",
          sortable: false,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 20,
      pageOptions: [5, 10, 15, 20, 25, 50],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filteredRows: null,
      filterOn: []
    };
  },
  methods: {
    makeToast(title, message, variant = "info") {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        variant,
        solid: true,
        toaster: "b-toaster-bottom-right",
        appendToast: true
      });
    },
    updateService(service) {
      this.$store.dispatch("service/updateService", { vm: this, service });
    },
    onFiltered(filteredItems) {
      this.filteredRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  computed: {
    ...mapGetters({
      services: "service/getServices"
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
      if (this.filteredRows !== null) {
        return this.filteredRows;
      }
      return this.services.length;
    }
  },
  components: {
    "new-service": ServiceAdd
  }
};
</script>