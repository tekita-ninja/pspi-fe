import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "IMAGE", value: "image",fixed:true,width:60 },
  { text: "NAME", value: "name" },
  { text: "PHONE", value: "phone" },
  { text: "TYPE", value: "type" },
  { text: "ACTIONS", value: "actions" },
];