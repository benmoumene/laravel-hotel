<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col sm="6" class="my-1">
        <b-form-group
          label="Status"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select v-model="onStatus" id="perPageSelect" size="sm" :options="statusOptions"></b-form-select>
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
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      small
      stacked="md"
      :items="filteredReservations"
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
      <template v-slot:cell(first_name)="row">{{ customer(row.item.customer_id).first_name }}</template>
      <template v-slot:cell(last_name)="row">{{ customer(row.item.customer_id).last_name }}</template>
      <template v-slot:cell(room_name)="row">
        <router-link
          :to="{path: '/room/' + row.item.room_id +'/edit'}"
        >{{ room(row.item.room_id).name }}</router-link>
      </template>
      <template v-slot:cell(actions)="row">
        <router-link :to="{path: row.item.id +'/show'}">
          <b-button size="sm" variant="primary">Show</b-button>
        </router-link>
        <b-button size="sm" @click="cancelReservation(row.item)" variant="danger">Cancel</b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
// Implementar filtro de fechas por defecto en RESERVATION LIST.
import { mapState, mapGetters } from "vuex";
export default {
  name: "ReservationList",
  data: function() {
    return {
      fields: [
        {
          key: "first_name",
          label: "First Name"
        },
        {
          key: "last_name",
          label: "Last Name"
        },
        {
          key: "room_name",
          label: "Room"
        },
        {
          key: "status",
          label: "status",
          sortable: true
        },
        {
          key: "from_date",
          label: "From",
          sortable: true
        },
        {
          key: "to_date",
          label: "To",
          sortable: true
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 20,
      statusOptions: ["all", "active", "cancelled", "expired"],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      onStatus: "active",
      filterOn: []
    };
  },
  methods: {
    customer(id) {
      return this.getCustomer(id);
    },
    room(id) {
      return this.getRoom(id);
    },
    cancelReservation(reservation) {
      this.$store.dispatch("reservation/cancelReservation", {
        vm: this,
        reservation
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
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
    ...mapState({
      reservations: state => state.reservation.reservations
    }),
    ...mapGetters({
      getCustomer: "customer/getCustomer",
      getRoom: "room/getRoom"
    }),
    filteredReservations() {
      if (this.onStatus === "all") {
        return this.reservations;
      }

      return this.reservations.filter(
        reservation => reservation.status === this.onStatus
      );
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
      return this.filteredReservations.length;
    }
  }
};
</script>