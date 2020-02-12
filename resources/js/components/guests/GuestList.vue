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
      :items="items"
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
      <template v-slot:cell(first_name)="{item}">{{ item.customer.first_name }}</template>
      <template v-slot:cell(last_name)="{item}">{{ item.customer.last_name }}</template>
      <template v-slot:cell(room_name)="{item}">
        <b-button size="sm" variant="info" @click="roomInfo(item.room.id)">{{ item.room.name }}</b-button>
      </template>
      <template v-slot:cell(actions)="{item}">
        <b-button size="sm" variant="info" @click="customerInfo(item.customer.id)">Customer</b-button>
        <b-button size="sm" variant="info">Reservation</b-button>
      </template>
    </b-table>

    <b-modal id="room-info-modal" size="xl" centered title="Room Info" hide-footer>
      <room-info :roomId="selectedRoomId" :readonly="true"></room-info>
    </b-modal>
    <b-modal id="customer-info-modal" size="xl" centered title="Customer Info" hide-footer>
      <customer-info :customerId="selectedCustomerId" :readonly="true"></customer-info>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Room from "../rooms/Room";
import Customer from "../customers/Customer";
export default {
  name: "GuestList",
  data: function() {
    return {
      selectedRoomId: null,
      selectedCustomerId: null,
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
          key: "room_name",
          label: "Room Name",
          sortable: true
        },
        {
          key: "check_in",
          label: "Check in",
          sortable: true
        },
        {
          key: "check_out",
          label: "Check Out",
          sortable: true
        },
        { key: "actions", label: "Actions" }
      ],
      items: [],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      totalRows: null,
      filterOn: []
    };
  },
  methods: {
    onFiltered(filteredItems) {
      this.currentPage = 1;
      this.totalRows = filteredItems.length;
    },
    roomInfo(id) {
      this.selectedRoomId = id;
      this.$bvModal.show("room-info-modal");
    },
    customerInfo(id) {
      this.selectedCustomerId = id;
      this.$bvModal.show("customer-info-modal");
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
    guestNormalized() {
      let newArray = [];

      for (const guest of this.guests) {
        guest.customer = this.getCustomer(guest.customer.id);
        guest.room = this.getRoom(guest.room.id);
        newArray.push(guest);
      }
      return newArray;
    }
  },
  watch: {
    guestNormalized: function(val) {
      this.filter = null;
      this.items = this.guestNormalized;
      this.totalRows = this.items.length;
    }
  },
  components: {
    "room-info": Room,
    "customer-info": Customer
  }
};
</script>