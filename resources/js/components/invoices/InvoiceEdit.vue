<template>
  <b-container fluid v-if="!invoice">Loading...</b-container>
  <b-container fluid v-else>
    <invoice-info :id="invoiceId" :readonly="false" />
    <b-row class="mt-3 text-right">
      <b-col>
        <b-button v-b-modal.invoice-pay-modal variant="primary">Mark as paid</b-button>
        <b-button @click="recalculate" variant="primary">Recalculate</b-button>
        <b-button @click="print" variant="secondary">PRINT</b-button>
      </b-col>
    </b-row>

    <b-modal id="invoice-pay-modal" size="md" centered title="Payment Info">
      <b-form-group label-cols="12" label-cols-sm="4" label="Payment Method">
        <b-form-select
          cols="12"
          v-model="invoice.payment_method"
          :options="{ '': 'Please select an option', 'cash': 'Cash', 'credit_card': 'Credit Card'}"
        ></b-form-select>
      </b-form-group>
      <template v-slot:modal-footer>
        <b-button @click="markAsPaid" variant="success" class="float-right">Mark as paid</b-button>
      </template>
    </b-modal>
  </b-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Invoice from "./Invoice";
export default {
  name: "InvoiceEdit",
  props: {
    id: { type: Number, required: false },
    readonly: { Type: Boolean, required: false }
  },
  data: function() {
    return {
      invoicex: { billed_services: [] }
    };
  },
  methods: {
    print() {
      let printWindow = window.open("", "PRINT", "height=400,width=600");
      let printDiv = document.getElementById("invoice").innerHTML;
      printWindow.document.head.innerHTML = document.head.innerHTML;
      printWindow.document.body.innerHTML = printDiv;
      printWindow.print();
      printWindow.close();
    },
    markAsPaid() {
      this.invoice.status = "paid";
      this.$store.dispatch("invoice/payInvoice", {
        vm: this,
        invoice: this.invoice
      });
    },
    recalculate() {
      this.$store.dispatch("invoice/recalculateInvoice", {
        vm: this,
        invoice: this.invoice
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
    }
  },
  computed: {
    ...mapGetters({
      getInvoice: "invoice/getInvoice"
    }),
    invoiceId() {
      if (this.id) {
        return this.id;
      }

      return parseInt(this.$route.params.id);
    },
    invoice() {
      return this.getInvoice(this.invoiceId);
    }
  },
  components: {
    "invoice-info": Invoice
  }
};
</script>