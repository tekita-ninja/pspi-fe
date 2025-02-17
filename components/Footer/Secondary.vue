<template>
  <div class="flex flex-col md:flex-row items-center gap-5 md:gap-0 px-5 py-10 md:p-20 text-[#A9D2EE]  bg-orange-primary">
    <div class="flex-1">
        <h1 class="koulen text-4xl text-center md:text-left md:text-5xl md:max-w-60">Pelajari Lebih Banyak</h1>
        <p class="spartan text-xl text-center md:text-left md:text-3xl font-normal">Kenali perusahaan secara lebih terperinci</p>
    </div>
    <div class="flex gap-6 flex-1 w-full">
        <NuxtLink class="w-1/2 bg-[#005998] flex flex-col items-center py-8 md:py-12 space-y-2 cursor-pointer" to="/about">
            <img src="/public/images/footer/about-us-icon.svg" alt="about-us-icon" class="w-1/2">
            <h2 class="text-xl md:text-3xl">Tentang Kami</h2>
        </NuxtLink>
        <NuxtLink class="w-1/2 bg-[#005998] flex flex-col items-center py-8 md:py-12 space-y-2 cursor-pointer" to="/product">
            <img src="/public/images/footer/our-product-icon.svg" alt="about-us-icon" class="w-1/2">
            <h2 class="text-xl md:text-3xl">Produk Kami</h2>
        </NuxtLink>
    </div>
  </div>
</template>
