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
      :items="settings"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
    >
      <template v-slot:cell(value)="row">
        <b-form-input v-model="row.item.value"></b-form-input>
      </template>

      <template v-slot:cell(description)="row">
        <b-form-input v-model="row.item.description"></b-form-input>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="updateSetting(row.item)">Update</b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Settings",
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
          key: "value",
          label: "Value",
          sortable: false,
          sortDirection: "desc"
        },
        {
          key: "description",
          label: "Description",
          sortable: false,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filteredRows: null
    };
  },
  methods: {
    updateSetting(setting) {
      this.$store.dispatch("setting/updateSetting", { vm: this, setting });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.filteredRows = filteredItems.length;
      this.currentPage = 1;
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
    ...mapGetters({
      settings: "setting/getSettings"
    }),
    totalRows() {
      // Cuando se aplica el filtro ...
      if (this.filteredRows !== null) {
        // Total de filas al aplicar filtros
        return this.filteredRows;
      }

      // Total de filas sin filtros
      return this.settings.length;
    }
  }
};
</script>