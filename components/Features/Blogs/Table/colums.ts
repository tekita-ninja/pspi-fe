import type { Header } from "vue3-easy-data-table";

export const columns: Header[] = [
  { text: "IMAGE", value: "image",fixed:true,width:60 },
  { text: "TITLE", value: "title",width:300 },
  { text: "AUTHOR", value: "author" },
  { text: "CATEGORY", value: "category.title" },
  { text: "CREATED BY", value: "created_by" },
  { text: "PUBLISH DATE", value: "publishedAt",width:160 },
  { text: "STATUS", value: "status" },
  { text: "ACTIONS", value: "actions" },
];