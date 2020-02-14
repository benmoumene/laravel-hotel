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
        <router-link :to="{path: '/reservations/' + customer_id +'/new'}">
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
        <template v-slot:cell(room_name)="row">
          <router-link
            :to="{path: '/room/' + row.item.room_id }"
          >{{ getRoomName(row.item.room_id) }}</router-link>
        </template>
        <template v-slot:cell(actions)="row">
          <router-link :to="{path: '/reservations/' + row.item.id +'/show'}">
            <b-button variant="info">Show</b-button>
          </router-link>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
          key: "room_name",
          label: "Room Name",
          sortable: true,
          class: "text-center"
        },
        {
          key: "from_date",
          label: "From",
          sortable: true,
          class: "text-center"
        },
        {
          key: "to_date",
          label: "To",
          sortable: true,
          class: "text-center"
        },
        {
          key: "status",
          label: "Status",
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
    totalRows() {
      return this.reservations.length;
    },
    ...mapGetters({
      getRoomName: "room/getRoomName"
    })
  }
};
</script>