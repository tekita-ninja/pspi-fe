<script setup lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useBlogStore } from "@/app/stores/useBlogStore";

definePageMeta({
  layout: 'overlay',
})

useSeoMeta({
  title: 'Publication',
  ogTitle: 'Publication',
  description: 'Berita atau blog dari PT Prima Synergy Petroleum Indonesia',
  ogDescription: 'Berita atau blog dari PT Prima Synergy Petroleum Indonesia',
  ogImage: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`,
  twitterCard: 'summary_large_image',
})

const common = useCommonStore()
const searchQuery = ref("");
const controller = useBlogStore();
await controller.getPublication(toQueryParams({
  ...common.$state.params,
  rowsPerPage: 6
}))
const handleSearch = async () => {
  common.changeParams({
    search: searchQuery.value || undefined,
  })
  await controller.getPublication(toQueryParams({
    ...common.$state.params,
    rowsPerPage: 6,
  }))
};


async function updateHandler(state: number) {
  await controller.getPublication(toQueryParams({
    ...common.$state.params,
    rowsPerPage: 6,
    page: state
  }))
  document.getElementById('initComponent')?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="bg-orange-primary relative pt-28 pb-16 md:pt-32 md:pb-32">
    <section class="relative mx-container md:py-10">
      <div class="text-center mb-4">
        <h1 class="koulen text-large-client text-white">PUBLIKASI</h1>
      </div>
      <div class="md:max-w-[1200px] mx-auto mb-4" id="initComponent">
        <form @submit.prevent="handleSearch" class="flex items-center justify-center gap-2 md:gap-5">
          <input v-model="searchQuery" type="text"
            class="w-full h-10 md:h-14 bg-white outline-none border border-transparent focus:border-orange-100 px-3 md:px-6 spartan text-lg md:text-2xl font-light"
            placeholder="Cari judul atau topik..." />
          <button @click="handleSearch" type="submit"
            class="shrink-0 flex items-center justify-center bg-[#599AC8] border-none px-10 spartan text-2xl font-semibold text-white h-10 md:h-14">
            CARI
          </button>
        </form>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 pt-5 md:pt-10">
          <div v-for="item in controller?.publications?.data" :key="item?.id">
            <ClientsNewsItem :item="item" />
          </div>
        </div>
      </div>
     
      <div v-if="controller.publications?.meta?.lastPage > 1"
        class="pagination-container flex items-center justify-center mb-3">
        <v-pagination v-model="controller.publications.meta.currentPage" :pages="controller.publications.meta.lastPage"
          :range-size="1" active-color="#DCEDFF" @update:modelValue="updateHandler" />
      </div>
    </section>
  </div>
</template>

<style>
.pagination-container .Pagination {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}

.pagination-container .Pagination .Page {
  background-color: #FFF !important;
  color: #334155;
  min-height: 35px;
  min-width: 35px;
  font-size: 16px;
  padding: 2px;
  border: none;
  border-radius: 10px;
}

.pagination-container .Pagination .Page.Page-active {
  cursor: default;
  background-color: #E5613A !important;
  color: #FFF;
  font-weight: 600;
}

.pagination-container .Pagination .PaginationControl {
  background-color: #FFF !important;
  height: 35px;
  width: 35px;
  margin: 0 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 10px;
}
</style>