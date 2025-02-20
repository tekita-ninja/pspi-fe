import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "FRONT IMAGE", value: "image",fixed:true,width:60 },
  { text: "No. POL", value: "nopol" },
  { text: "MERK", value: "merk" },
  { text: "KOMPARTEMENT", value: "kompartment" },
  { text: "ACTIONS", value: "actions" },
];