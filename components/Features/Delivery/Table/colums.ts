import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "CODE", value: "code", width: 200 },
  { text: "ARMADA", value: "armada", width: 300 },
  { text: "DATE", value: "date",width: 300 },
  { text: "DESTINATION", value: "tujuan", width:200 },
  { text: "STATUS", value: "statusPengiriman",width:100 },
  { text: "ACTIONS", value: "actions", width: 100 },
];