<script setup lang="ts">
definePageMeta({
  layout: "overlay",
});

useHead({
  title: "Mitra Kami",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`,
    },
    {
      name: "description",
      content:
        "Kami percaya bahwa kemitraan yang solid adalah kunci keberhasilan. Kami menjalin kerja sama dengan PT.PAA sebagai mitra transportasi terpercaya.",
    },
  ],
});
</script>
<template>
  <ClientsPartnerHeader />
  <ClientsPartnerPayment />
  <ClientsPartnerCustomer />
  <ClientsPartnerBestPartner />
  <ClientsPartnerHereWhy />
</template>
