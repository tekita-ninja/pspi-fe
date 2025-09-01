import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "CODE", value: "code", width: 200 },
  { text: "ARMADA", value: "armada", width: 300 },
  { text: "CUSTOMER", value: "nama_penerima", width: 300 },
  { text: "DATE", value: "date", width: 300 },
  { text: "QUANTITY", value: "quantity", width: 200 },
  { text: "STATUS", value: "statusPengiriman", width: 100 },
  { text: "ACTIONS", value: "actions", width: 300, fixed: true },
];