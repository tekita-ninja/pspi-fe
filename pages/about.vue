<script setup lang="ts">
definePageMeta({
  layout: 'overlay',
})

useHead({
  title: "About Us",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`
    },
    {
      name: "description",
      content: "PT. Prima Synergy Petroleum Indonesia adalah agen resmi Pertamina Patra Niaga yang menyediakan berbagai produk berkualitas dengan pelayanan tercepat dan terbaik. Kami berkomitmen untuk menjadi jaringan distribusi Bio Solar B40 terpercaya di seluruh Indonesia yang menawarkan berbagai pilihan produk berkualitas tinggi dan ramah lingkungan."
    },
  ]
});
</script>

<template>
  <ClientsAboutUsJumbotron />
  <ClientsAboutUsHistory />
  <ClientsAboutUsGoals />
  <ClientsAboutUsChartOrg />
</template>
