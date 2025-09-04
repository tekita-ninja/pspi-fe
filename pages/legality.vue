<script setup lang="ts">
import { useLegalDocumentStore } from '@/app/stores/useLegalDocumentStore';

definePageMeta({
  layout: 'overlay',
})
useHead({
  title: "Legalitas",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`
    },
    {
      name: "description",
      content: "KEMITRAAN DENGAN PT.PERTAMINA PATRA NIAGA"
    },
    {
      name: "og:description",
      content: "KEMITRAAN DENGAN PT.PERTAMINA PATRA NIAGA"
    },
  ]
});
const controller = useLegalDocumentStore()
await controller.getAll()

console.log({
  data: controller.all
})
</script>
<template>
  <div class="h-[120px] bg-[#025692]"></div>
  <ClientsLegaliltyHeader />
  <div class="mx-container space-y-5">
    <div class=" max-w-5xl mx-auto">
    </div>
    <img src="/images/legals/legal-01.png" alt="Legal" class="w-full max-w-3xl mx-auto" />
  </div>
  <!-- LEGALITAS -->
  <section class="px-5 md:px-20 py-10 md:py-24 bg-white space-y-10">
    <div class="space-y-10" v-for="item in controller.all" :key="item.id">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          {{item.title}}
        </h3>
      </div>
      <div>
        <img :src="toAssetLink(item.file)" alt="NPWP" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>
    <!-- <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          SIUP (OSS)
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-04.png" alt="SIUP (OSS)" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>
    <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          AKTA PENDIRIAN
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-05.png" alt="AKTA PENDIRIAN" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>
    <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          SK KEMENKUMHAM
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-06.png" alt="SK KEMENKUMHAM" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>

    <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          KEPHAM PERUBAHAN ANGGARAN
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-07.png" alt="KEPHAM PERUBAHAN ANGGARAN" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>
    <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          KONTRAK LINTAS REGION
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-08.png" alt="KONTRAK LINTAS REGION" class="w-full max-w-3xl mx-auto" />
      </div>
    </div>

    <div class="space-y-10">
      <div class="border-b border-[#599AC8] pb-2">
        <h3 class="koulen text-semibold text-3xl md:text-5xl text-orange-primary">
          SIMFIT NO. 146 TAHUN 2025 SUMBAGUT
        </h3>
      </div>
      <div>
        <img src="/images/legals/legal-09.png" alt="SIMFIT NO. 146 TAHUN 2025 SUMBAGUT"
          class="w-full max-w-3xl mx-auto" />
      </div>
    </div> -->

  </section>
</template>