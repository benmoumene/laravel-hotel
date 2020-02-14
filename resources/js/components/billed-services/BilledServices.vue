<template>
  <b-container fluid>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
    ></b-pagination>
    <b-table
      show-empty
      small
      stacked="md"
      :items="billedServices"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template v-slot:cell(name)="row">{{ service(row.item.service_id).name }}</template>
      <template v-slot:cell(cost)="row">{{ service(row.item.service_id).cost }}</template>
      <template v-slot:cell(comments)="row">{{ service(row.item.service_id).comments }}</template>
      <template v-slot:cell(description)="row">{{ service(row.item.service_id).description }}</template>

      <template v-slot:cell(actions)="row">
        <b-button
          v-b-tooltip.hover
          title="Remove this service"
          size="sm"
          variant="danger"
          @click="deleteService(row.item.id)"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "BilledServices",
  data: function() {
    return {
      fields: [
        {
          key: "name",
          label: "Service"
        },
        {
          key: "cost",
          label: "Cost"
        },
        {
          key: "comments",
          label: "Description"
        },
        {
          key: "billed_on",
          label: "Billed on"
        },
        { key: "actions", label: "Actions" }
      ],
      currentPage: 1,
      perPage: 10
    };
  },
  props: {
    reservationId: { type: Number, required: true },
    readonly: { Type: Boolean, required: true }
  },
  methods: {
    deleteService(id) {
      this.$store.dispatch("billedservice/delete", {
        vm: this,
        id
      });
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
    service(id) {
      return this.getService(id);
    }
  },
  computed: {
    ...mapGetters({
      getService: "service/getService",
      getBilledServices: "billedservice/getBilledServices"
    }),
    billedServices() {
      return this.getBilledServices(this.reservationId);
    },
    totalRows() {
      return this.billedServices.length;
    }
  }
};
</script>
