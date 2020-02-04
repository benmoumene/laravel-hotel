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
      :items="rooms"
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

      <template v-slot:cell(type)="row">
        <b-form-select
          :value="null"
          :options="{ 'single': 'Single', 'double': 'Double', 'suite': 'Suite'}"
          v-model="row.item.type"
        ></b-form-select>
      </template>

      <template v-slot:cell(floor)="row">
        <b-form-select
          :value="null"
          :options="{'1F':'1 Floor', '2F': '2 Floor' , '3F': '3 Floor'}"
          v-model="row.item.floor"
        ></b-form-select>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="updateRoom(row.item)">Update</b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "RoomList",
  data: function() {
    return {
      fields: [
        {
          key: "name",
          label: "Room name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "type",
          label: "Room type",
          sortable: true,
          class: "text-center"
        },
        {
          key: "floor",
          label: "Location room",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  methods: {
    onFiltered() {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentPage = 1;
    },
    updateRoom(room) {
      this.$store.dispatch("room/editRoom", { vm: this, room });
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
      rooms: state => state.room.rooms
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
      return this.rooms.length;
    }
  },
  mounted() {},
  updated() {}
};
</script>
<style scoped>
</style>