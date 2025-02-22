<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Lacak Pengiriman",
  meta: [
    {
      name: "og:image",
      content: `${import.meta.env.VITE_SITE_URL}/logo-full-white.png`,
    },
    {
      name: "description",
      content:
        "Lacak Pengiriman",
    },
  ],
});
</script>
<template>
  <div class="bg-orange-primary ">
    <div class="max-w-4xl px-3 mx-auto py-12">
      <div class="mb-12">
        <h2 class="krona-one text-lg md:text-2xl text-center mb-4 text-white">LACAK PENGIRIMAN</h2>
        <div class="flex flex-col items-center space-y-4">
          <input
            class="border bg-white h-10 w-full px-3 outline-none focus:bg-white/30 focus:placeholder:text-white placeholder:text-[#599AC8] text-white"
            type="text" placeholder="Input No. Pengiriman">
          <button class="bg-[#599AC8] py-2 px-5 text-white font-semibold">LACAK</button>
        </div>
      </div>
      <div class="border-8 border-[#599AC8] bg-gradient-to-b from-[#BAE3FF] to-[#FFFFFF] p-6 text-[#00528C]">
        <div class="space-y-3">
          <div class="flex flex-col md:flex-row">
            <div class="w-44 shrink-0 font-bold">NO. PENGIRIMAN</div>
            <div class="w-2 hidden md:block">:</div>
            <div class="flex-1">XXXX-XXXX-XXXX</div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-2 hidden md:block">:</div>
            <div class="w-44 shrink-0 font-bold">STATUS PENGIRIMAN</div>
            <div class="flex-1">On-going</div>
          </div>
        </div>
        <div class="mt-6">
          <div>Informasi Kurir :</div>
          <div class="bg-white shadow-lg mt-3 p-2 md:p-6 rounded-xl">
            <div class="flex justify-center pb-6 border-b-2 border-[#00528C]">
              <Logo />
            </div>
            <div>
              <div class="flex flex-col md:flex-row pt-6 gap-3 items-start">
                <div class="flex-1 space-y-6">
                  <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                    <div class="w-44 shrink-0 font-bold">Nama</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">Genta</div>
                  </div>
                  <div class="flex flex-col md:flex-row px-3 py-2">
                    <div class="w-44 shrink-0 font-bold">Profil Armada</div>
                    <div class="w-2 hidden md:block">:</div>
                    <div class="flex-1">
                      <div>BK 8380 MS | MITSUBISHI</div>
                      <div class="grid grid-cols-2 gap-2 my-2">
                        <div class="aspect-video border"><img class="h-full w-full object-cover"
                            src="/images/home/bg-visimisi.png" alt=""></div>
                        <div class="aspect-video border"><img class="h-full w-full object-cover"
                            src="/images/home/bg-visimisi.png" alt=""></div>
                        <div class="aspect-video border"><img class="h-full w-full object-cover"
                            src="/images/home/bg-visimisi.png" alt=""></div>
                        <div class="aspect-video border"><img class="h-full w-full object-cover"
                            src="/images/home/bg-visimisi.png" alt=""></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 mx-auto mb-4 md:w-1/4 shrink-0 aspect-[3/4] border">
                  <img class="h-full w-full object-cover" src="/images/home/bg-visimisi.png" alt="">
                </div>
              </div>
              <div class="flex flex-col md:flex-row px-3 py-2 rounded-full bg-[#D7EFFF]">
                <div class="w-44 shrink-0 font-bold">Kapasitas Manual</div>
                <div class="w-2 hidden md:block">:</div>
                <div class="flex-1">16 kl</div>
              </div>
            </div>
          </div>
        </div>
        <div class="py-6 md:py-12">
          <div class="font-bold">Progres Pengiriman :</div>
          <div class="flex flex-col items-center gap-1">
            <div class="flex w-full">
              <div class="flex-1 p-3 md:p-6"></div>
              <div class="w-4 border-r-4 border-dotted border-[#00528C]"></div>
              <div class="flex-1 p-3 md:p-6 text-start">
                <div>
                  <p class="text-sm">01-01-2025, 13.53 WIB</p>
                  <div class="text-lg font-semibold">Pesanan sedang dalam perjalanan</div>
                </div>
              </div>
            </div>
            <div class="flex w-full">
              <div class="flex-1 p-3 md:p-6 text-end">
                <div>
                  <p class="text-sm">01-01-2025, 13.53 WIB</p>
                  <div class="text-lg font-semibold">Pesanan sedang dalam perjalanan</div>
                </div>
              </div>
              <div class="w-4 border-r-4 border-dotted border-[#00528C]"></div>
              <div class="flex-1 p-3 md:p-6"></div>
            </div>
            <div class="flex w-full">
              <div class="flex-1 p-3 md:p-6"></div>
              <div class="w-4 border-r-4 border-dotted border-[#00528C]"></div>
              <div class="flex-1 p-3 md:p-6 text-start">
                <div>
                  <p class="text-sm">01-01-2025, 13.53 WIB</p>
                  <div class="text-lg font-semibold">Pesanan di buat</div>
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <img class="w-12 h-12 ml-3" src="/images/box-lacak.png" alt="box">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
