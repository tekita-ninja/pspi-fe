<script setup lang="ts">
import { useDeliveryStore } from '@/app/stores/useDeliveryStore';

definePageMeta({
  layout: "default",
});

useHead({
  title: "Informasi Pengiriman",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`,
    },
    {
      name: "description",
      content:
        "Innformasi Pengiriman",
    },
  ],
});
const controller = useDeliveryStore()
const kodePengiriman = ref()
async function handleLacak() {
  await controller.getByCode(kodePengiriman.value)
}
async function handleClickLacak(e: any) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    await controller.getByCode(kodePengiriman.value)
  }
}
</script>
<template>
  <div class="bg-orange-primary ">
    <div class="max-w-4xl px-3 mx-auto py-12">
      <div class="mb-12">
        <h2 class="krona-one text-lg md:text-2xl text-center mb-4 text-white uppercase">Informasi Pesanan</h2>
        <div class="flex flex-col items-center space-y-4">
          <input v-model="kodePengiriman" @keyup="handleClickLacak"
            class="border bg-white h-10 w-full px-3 outline-none focus:bg-white/10 focus:placeholder:text-white placeholder:text-[#599AC8] text-[#599AC8]"
            type="text" placeholder="Input Kode Pengiriman">
          <button :disabled="controller.loading" @click="handleLacak"
            class="bg-[#599AC8] py-2 px-5 text-white font-semibold flex items-center gap-2">
            <Icon v-if="controller.loading" name="mingcute:loading-fill" class="animate-spin" />
            LACAK
          </button>
        </div>
      </div>
      <div v-if="controller.detail?.id"
        class="border-8 border-[#599AC8] bg-gradient-to-b from-[#BAE3FF] to-[#FFFFFF] p-6 text-[#00528C]">
        <div class="space-y-3">
          <div class="flex flex-col md:flex-row">
            <div class="w-44 shrink-0 font-bold">KODE PENGIRIMAN</div>
            <div class="w-2 hidden md:block">:</div>
            <div class="flex-1">{{ controller.detail.code }}</div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-44 shrink-0 font-bold">STATUS PENGIRIMAN</div>
            <div class="w-2 hidden md:block">:</div>
            <div v-if="controller.detail.statusPengiriman === 0" class="flex-1">Pending</div>
            <div v-if="controller.detail.statusPengiriman === 1" class="flex-1">On-Going</div>
            <div v-if="controller.detail.statusPengiriman === 3" class="flex-1">Delivered</div>
          </div>
        </div>
        <div class="mt-6">
          <div>Informasi Pengiriman :</div>
          <div class="bg-white shadow-lg mt-3 p-2 md:p-6 rounded-xl">
            <div class="flex justify-center pb-6 border-b-2 border-[#00528C]">
              <Logo />
            </div>
            <div>
              <div class="flex flex-col md:flex-row pt-6 gap-3 items-start">
                <div class="flex-1 space-y-6">
                  <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                    <div class="w-44 shrink-0 font-bold">Nama Driver</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">{{ controller.detail.driver?.name || '-' }}</div>
                  </div>
                  <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                    <div class="w-44 shrink-0 font-bold">Nama Codriver</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">{{ controller.detail?.codriver?.name || '-' }}</div>
                  </div>
                  <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                    <div class="w-44 shrink-0 font-bold">No. Telepon</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">{{ controller.detail.driver?.phone || '-' }}</div>
                  </div>
                  <div class="flex flex-col md:flex-row px-3 py-2">
                    <div class="w-44 shrink-0 font-bold">Profil Armada</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">
                      <div>{{ controller.detail.armada?.nopol }} | {{ controller.detail.armada?.merk }}</div>
                      <div class="grid grid-cols-2 gap-2 my-2">
                        <div class="aspect-video border">
                          <img v-if="controller.detail.armada?.image_front" class="h-full w-full object-contain"
                            :src="toAssetLink(controller.detail.armada?.image_front)" alt="">
                        </div>
                        <div class="aspect-video border">
                          <img v-if="controller.detail.armada?.image_back" class="h-full w-full object-contain"
                            :src="toAssetLink(controller.detail.armada?.image_back)" alt="">
                        </div>
                        <div class="aspect-video border">
                          <img v-if="controller.detail.armada?.image_left" class="h-full w-full object-contain"
                            :src="toAssetLink(controller.detail.armada?.image_left)" alt="">
                        </div>
                        <div class="aspect-video border">
                          <img v-if="controller.detail.armada?.image_right" class="h-full w-full object-contain"
                            :src="toAssetLink(controller.detail.armada?.image_right)" alt="">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 mx-auto mb-4 md:w-1/4 shrink-0 aspect-[3/4] border">
                  <img class="h-full w-full object-cover" :src="toAssetLink(controller.detail.driver?.image)" alt="">
                </div>
              </div>
              <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                <div class="w-44 shrink-0 font-bold">Quantity</div>
                <div class="w-2 hidden md:block">:</div>
                <div class="flex-1">{{ controller.detail?.quantity ? toNumberIDR(controller.detail?.quantity) + " ℓ": '-' }}</div>
              </div>
              <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF] mt-3">
                <div class="w-44 shrink-0 font-bold">Dokumen</div>
                <div class="w-2 hidden md:block">:</div>
                <a v-if="controller.detail?.armada.terra_doc" :href="toAssetLink(controller.detail?.armada.terra_doc)"
                  target="_blank" rel="noopener noreferrer" class="font-bold underline"> Lihat Dokumen </a>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 md:py-12">
          <div class="font-bold">Progres Pengiriman :</div>
          <div class="flex flex-col items-center gap-1">
            <template v-for="item, index in controller.detail.progress_pengiriman" :key="index">
              <div class="flex w-full" v-if="index % 2 === 0">
                <div class="flex-1 p-3 md:p-6"></div>
                <div class="w-4 border-r-4 border-dotted border-[#00528C]"></div>
                <div :class="[
                  'flex-1 p-3 md:p-6 text-start'
                ]">
                  <div>
                    <p class="text-sm">{{ $dayjs(item.createdAt).format('DD MMMM YYYY') }}</p>
                    <div class="text-lg font-semibold">{{ item.description }}</div>
                  </div>
                </div>
              </div>
              <div class="flex w-full" v-if="index % 2 === 1">
                <div :class="[
                  'flex-1 p-3 md:p-6 text-end'
                ]">
                  <div>
                    <p class="text-sm">{{ $dayjs(item.createdAt).format('DD MMMM YYYY') }}</p>
                    <div class="text-lg font-semibold">{{ item.description }}</div>
                  </div>
                </div>
                <div class="w-4 border-r-4 border-dotted border-[#00528C]"></div>
                <div class="flex-1 p-3 md:p-6"></div>
              </div>
            </template>
            <div class="flex justify-end mt-4">
              <img class="w-12 h-12 ml-3" src="/images/box-lacak.png" alt="box">
            </div>
            <div v-if="controller.detail?.bukti_pengiriman && controller.detail?.bukti_pengiriman.length > 0">
              <div class="text-center mb-3 font-bold">
                BUKTI PENGIRIMAN
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div class="w-full h-full" v-for="item in controller.detail.bukti_pengiriman">
                  <img class="w-full h-full object-contain" :src="toAssetLink(item.image)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
