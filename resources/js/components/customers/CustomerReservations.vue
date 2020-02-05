<template>
  <b-container fluid>
    <b-row class="mb-3">
      <b-col cols="6">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col cols="6">
        <router-link :to="{path: '/reservation/' + customer_id +'/new'}">
          <b-button class="float-right">New reservation</b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-table
        show-empty
        stacked="md"
        :items="reservations"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <!-- Al hacer click en room mostrar info de esta -->
        <template v-slot:cell(room.name)="row">
          <router-link :to="{path: '/room/' + row.item.room_id }">{{ row.item.room.name }}</router-link>
        </template>
        <template v-slot:cell(actions)="row">
          <router-link :to="{path: row.item.id +'/cancel'}">
            <b-button variant="info">Show</b-button>
          </router-link>
          <b-button @click="cancelReservation(row.item)" variant="danger">Cancel</b-button>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "CustomerReservations",
  props: {
    reservations: { type: Array, required: true },
    customer_id: { type: Number, required: true }
  },
  data: function() {
    return {
      fields: [
        {
          key: "room.name",
          label: "Room Name",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_in",
          label: "Check In",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_out",
          label: "Check Out",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10
    };
  },
  methods: {
    cancelReservation(reservation) {
      this.deleteReservation({ vm: this, reservation });
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
    },
    ...mapActions({
      deleteReservation: "reservation/deleteReservation"
    })
  },
  computed: {
    totalRows() {
      return this.reservations.length;
    }
  }
};
</script>
<style scoped>
</style>