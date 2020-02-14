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
      :items="invoices"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template v-slot:cell(status)="row">
        <b-badge :variant="row.item.status == 'paid' ? 'success' : 'danger'">{{ row.item.status }}</b-badge>
      </template>
      <template v-slot:cell(actions)="row">
        <router-link :to="{path: '/invoices/' + row.item.id +'/edit'}" class="nav-link">
          <b-button variant="primary">Show</b-button>
        </router-link>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "CustomerInvoices",
  data: function() {
    return {
      fields: [
        {
          key: "total",
          label: "Total",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "generated_on",
          label: "Generated On",
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
    customerId: { type: Number, required: true }
  },
  computed: {
    ...mapGetters({
      customerInvoices: "billing/getCustomerInvoices"
    }),
    invoices() {
      return this.customerInvoices(this.customerId).filter(
        invoice => invoice.status !== null
      );
    },
    totalRows() {
      return this.invoices.length;
    }
  }
};
</script>