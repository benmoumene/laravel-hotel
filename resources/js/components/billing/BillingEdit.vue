<template>
  <b-container fluid>
    <div class="invoice">
      <b-row class="header mb-3">
        <b-col cols="12">
          <strong>{{ getSettingValue('hotel_name') }}</strong>
        </b-col>
        <b-col cols="12">{{ getSettingValue('hotel_address') }}</b-col>
        <b-col cols="12">{{ getSettingValue('hotel_phone') }}</b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <strong>Invoice #</strong>
          {{ invoice.id }}
        </b-col>
        <b-col>
          <strong>Date</strong>
          {{ invoice.generated_on }}
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Customer</strong>
        </b-col>
        <b-col cols="12">
          <strong>Name</strong>
          {{ invoice.guest.customer.first_name }}
          {{ invoice.guest.customer.last_name }}
        </b-col>
        <b-col cols="6">
          <strong>Phone</strong>
          {{ invoice.guest.customer.phone }}
        </b-col>
        <b-col cols="6">
          <strong>Address</strong>
          {{ invoice.guest.customer.address }}
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Reservation</strong>
        </b-col>

        <b-col cols="6">
          <strong>From</strong>
          {{ invoice.guest.reservation.check_in }}
        </b-col>
        <b-col cols="6">
          <strong>To</strong>
          {{ invoice.guest.reservation.check_out }}
        </b-col>
        <b-col cols="6">
          <strong>Arrival</strong>
          {{ invoice.guest.check_in }}
        </b-col>
        <b-col cols="6">
          <strong>Left</strong>
          {{ invoice.guest.check_out }}
        </b-col>
        <b-col cols="6">
          <strong>Room</strong>
          {{ invoice.guest.reservation.room.name }}
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Billed Services</strong>
        </b-col>
        <b-col cols="12">
          <b-row v-for="billed_service in invoice.billed_services" :key="billed_service.id">
            <b-col>
              <b-link @click="deleteBilledService(billed_service.id)">
                <i class="fas fa-trash"></i>
              </b-link>
              {{ billed_service.service.name }}
            </b-col>
            <b-col>{{ billed_service.service.cost }}</b-col>
            <b-col>{{ billed_service.billed_on }}</b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col cols="12">
          <strong>Total</strong>
        </b-col>
        <b-col cols="12">Due amount: {{ invoice.total }}</b-col>
      </b-row>

      <b-row class="mb-3 pull-right">
        <b-col>
          <b-button v-b-modal.modal-center variant="success">Mark as paid</b-button>
          <b-button @click="regenerate" variant="success">Regenerate</b-button>
        </b-col>
      </b-row>
    </div>

    <b-modal id="modal-center" centered title="Reservation Info">
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">Payment Method:</b-col>
      </b-row>
      <b-row>
        <b-col sm="3" class="avatar-menu-inner">
          <b-button @click="markAsPaid" variant="success">DONE</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Billing",
  methods: {
    deleteBilledService(id) {
      this.$store.dispatch("billing/deleteBilledService", { vm: this, id });
    },
    markAsPaid() {
      var invoiceId = parseInt(this.$route.params.id);
      var invoice = this.getInvoiceById(invoiceId);
      invoice.status = "success";
      invoice.payment_method = "cash";
      this.$store.dispatch("billing/updateInvoice", { vm: this, invoice });
    },
    regenerate() {
      // invoice id
      var invoiceId = parseInt(this.$route.params.id);
      var invoice = this.getInvoiceById(invoiceId);
      this.$store.dispatch("billing/updateInvoice", { vm: this, invoice });
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
    ...mapState(["settings"]),
    ...mapGetters({
      getSettingValue: "getSettingValue",
      getInvoiceById: "billing/getInvoiceById"
    }),
    invoice() {
      var invoiceId = parseInt(this.$route.params.id);
      var invoice = this.getInvoiceById(invoiceId);
      if (typeof invoice === "undefined") {
        return "";
      }
      return invoice;
    }
  },
  components: {},
  mounted() {}
};
</script>
<style scoped>
.invoice {
  border: 1px solid gray;
  padding: 5px 15px;
}
</style>