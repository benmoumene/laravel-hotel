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
      :items="guests"
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
      <template v-slot:cell(first_name)="row">
        <b-link v-b-modal.modal-center>{{ customer(row.item.customer.id).first_name }}</b-link>
      </template>
      <template v-slot:cell(last_name)="row">
        <b-link v-b-modal.modal-center>{{ customer(row.item.customer.id).last_name }}</b-link>
      </template>
      <template v-slot:cell(room.name)="row">
        <b-link v-b-modal.modal-center>{{ room(row.item.room.id).name }}</b-link>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button variant="info" @click="showCustomerInfo(row.item)">Customer</b-button>
        <router-link :to="{path: row.item.id +'/cancel'}">
          <i class="nav-icon fa fa-bed"></i>
          Show
        </router-link>
        <b-button @click="cancelReservation(row.item)" variant="primary">CANCEL</b-button>
      </template>
    </b-table>

    <b-modal id="modal-center" centered title="Reservation Info">
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Room Name:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Type:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Floor:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">From:</b-col>
        <b-col sm="3" class="avatar-menu-inner">To:</b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "GuestList",
  data: function() {
    return {
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
          key: "room.name",
          label: "Room Name",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_in",
          label: "Check in",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_out",
          label: "Check in",
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentPage = 1;
    },
    customer(id) {
      return this.getCustomer(id);
    },
    room(id) {
      return this.getRoom(id);
    }
  },
  computed: {
    ...mapState({
      guests: state => state.guest.guests
    }),
    ...mapGetters({
      getCustomer: "customer/getCustomer",
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
    totalRows() {
      return this.guests.length;
    }
  }
};
</script>