<template>
  <b-container fluid v-if="!invoice">Loading...</b-container>
  <b-container fluid v-else>
    <invoice-info :invoiceId="getInvoiceId" :readonly="false" />
    <b-row class="mt-3 pull-right">
      <b-col>
        <b-button v-b-modal.invoice-pay-modal variant="success">Mark as paid</b-button>
        <b-button @click="recalculate" variant="success">Recalculate</b-button>
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
    invoiceId: { type: Number, required: false },
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
    deleteBilledService(id) {
      this.$store.dispatch("billed_services/deleteBilledService", {
        vm: this,
        id
      });
    },
    markAsPaid() {
      this.invoice.status = "success";
      this.$store.dispatch("billing/payInvoice", {
        vm: this,
        invoice: this.invoice
      });
    },
    recalculate() {
      this.$store.dispatch("billing/recalculateInvoice", {
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
    ...mapState(["settings"]),
    ...mapGetters({
      getService: "service/getService",
      getCustomer: "customer/getCustomer",
      getBilledServices: "billed_services/getBilledServices",
      getReservation: "reservation/getReservation",
      getGuestWithReservationId: "guest/getGuestWithReservationId",
      getSettingValue: "getSettingValue",
      getInvoice: "billing/getInvoice",
      getRoom: "room/getRoom"
    }),
    getInvoiceId() {
      if (this.reservationId) {
        return this.reservationId;
      }

      return parseInt(this.$route.params.id);
    },
    invoice() {
      return this.getInvoice(this.getInvoiceId);
    },
    reservation() {
      var reservation = this.getReservation(this.invoice.reservation_id);

      if (typeof reservation === "undefined") {
        return "";
      }
      return reservation;
    },
    guest() {
      var guest = this.getGuestWithReservationId(this.invoice.reservation_id);

      if (typeof guest === "undefined") {
        //return { id: 0, from_date: "", to_date: "" };
        return "";
      }
      return guest;
    },
    customer() {
      var customer = this.getCustomer(this.reservation.customer_id);
      if (typeof customer === "undefined") {
        //return { id: 0, from_date: "", to_date: "" };
        return "";
      }
      return customer;
    },
    room() {
      var room = this.getRoom(this.reservation.room_id);
      if (typeof room === "undefined") {
        return "";
      }
      return room;
    },
    billedServices() {
      var services = this.getBilledServices(this.reservation.id);
      if (typeof services === "undefined") {
        return [];
      }
      return services;
    }
  },
  components: {
    "invoice-info": Invoice
  }
};
</script>
<style scoped>
.invoice {
  border: 1px solid gray;
  padding: 5px 15px;
}
</style>