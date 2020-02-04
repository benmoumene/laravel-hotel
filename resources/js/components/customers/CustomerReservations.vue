<template>
  <b-container fluid>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      class="my-0"
    ></b-pagination>
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
        <b-link v-b-modal.modal-center>{{ row.item.room.name }}</b-link>
      </template>
      <template v-slot:cell(actions)="row">
        <router-link :to="{path: row.item.id +'/cancel'}" class="nav-link">
          <i class="nav-icon fa fa-bed"></i>
          Show
        </router-link>
        <b-button @click="cancelReservation(row.item)" variant="primary">CANCEL</b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
export default {
  name: "CustomerInvoices",
  data: function() {
    return {
      fields: [
        {
          key: "customer.first_name",
          label: "First Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "customer.last_name",
          label: "Last Name",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "customer.phone",
          label: "phone",
          sortable: true,
          class: "text-center"
        },
        {
          key: "customer.document_id",
          label: "Document Id",
          sortable: true,
          class: "text-center"
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
      perPage: 10
    };
  },
  props: {
    reservations: { type: Array, required: true }
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