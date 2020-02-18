<template>
  <b-container fluid>
    <!-- User Interface controls -->

    <b-row class="my-1">
      <b-col cols="12" class="text-right">
        <b-button v-b-modal.room-modal variant="primary">
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

      <template v-slot:cell(size)="row">
        <b-form-select
          :value="null"
          :options="{ 'single': 'Single', 'double': 'Double'}"
          v-model="row.item.size"
        ></b-form-select>
      </template>

      <template v-slot:cell(type)="row">
        <b-form-select
          :value="null"
          :options="{ 'common': 'Common', 'suite': 'Suite'}"
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

    <b-modal id="room-modal" size="md" centered title="New Room" hide-footer>
      <new-room></new-room>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import RoomAdd from "./RoomAdd";
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
          key: "size",
          label: "Room size",
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
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filteredRows: null,
      filterOn: []
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.filteredRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateRoom(room) {
      this.$store.dispatch("room/updateRoom", { vm: this, room });
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
      rooms: "room/getRooms"
    }),
    totalRows() {
      if (this.filteredRows !== null) {
        return this.filteredRows;
      }
      return this.rooms.length;
    }
  },
  components: {
    "new-room": RoomAdd
  }
};
</script>