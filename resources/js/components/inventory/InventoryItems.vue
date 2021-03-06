<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col cols="12" class="text-right">
        <b-button v-b-modal.item-modal variant="primary">
          <i class="fas fa-plus"></i>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col cols="12" sm="6">
        <b-input-group>
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
      </b-col>

      <b-col cols="12" sm="6">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="inventory"
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

      <template v-slot:cell(quantity)="row">
        <b-form-input v-model="row.item.quantity"></b-form-input>
      </template>

      <template v-slot:cell(min_stock)="row">
        <b-form-input v-model="row.item.min_stock"></b-form-input>
      </template>

      <template v-slot:cell(description)="row">
        <b-form-input v-model="row.item.description"></b-form-input>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="updateItem(row.item)">Update</b-button>
      </template>
    </b-table>

    <b-modal id="item-modal" size="md" centered title="New item" hide-footer>
      <new-item></new-item>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import InventoryItemAdd from "./InventoryItemAdd";
export default {
  name: "InventoryItemList",
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
          key: "quantity",
          label: "Quantity",
          sortable: false,
          sortDirection: "desc"
        },
        {
          key: "min_stock",
          label: "Alert stock",
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
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filteredRows: null,
      filterOn: []
    };
  },
  methods: {
    updateItem(item) {
      this.$store.dispatch("inventory/updateItem", { vm: this, item });
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
      inventory: "inventory/getItems"
    }),
    totalRows() {
      if (this.filteredRows !== null) {
        return this.filteredRows;
      }
      return this.inventory.length;
    }
  },
  components: {
    "new-item": InventoryItemAdd
  }
};
</script>