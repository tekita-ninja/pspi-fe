<script setup lang="ts">
definePageMeta({
  layout: 'overlay',
})
useHead({
  title: "Produk Kami",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`
    },
    {
      name: "description",
      content: "Kami berkomitmen untuk mendukung program Kementerian Energi dan Sumber Daya Mineral dalam meningkatkan pasokan energi bersih secara berkelanjutan."
    },
  ]
});
</script>
<template>
  <ClientsProductJumbotron />
  <ClientsProductCommitment />
  <ClientsProductLists />
  <ClientsProductContactUs />
</template>
