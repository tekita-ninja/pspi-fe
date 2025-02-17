<script setup>
import { ref, watch } from "vue";
const isOpen = ref(false);

const setOpen = () => {
  isOpen.value = !isOpen.value;
};

watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

const links = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "TENTANG KAMI",
    url: "/about",
  },
  {
    title: "PRODUK KAMI",
    url: "/product",
  },
  {
    title: "LEGALITAS",
    url: "/legality",
  },
  {
    title: "MITRA KAMI",
    url: "/partnership",
  },
  {
    title: "PUBLIKASI",
    url: "/publication",
  },
];
</script>

<template>
  <nav class="bg-gradient-to-b from-orange-primary to-orange-light/5 fixed top-0 inset-x-0 z-50 px-5 md:px-20 ">
    <div class="flex items-center justify-between relative h-[80px] md:h-[120px]">
      <nuxt-link to="/" active-class="text-orange-primary">
        <img src="/public/images/logo.webp" alt="Logo" class="h-9 md:h-16 brightness-0 invert" />
      </nuxt-link>
      <!-- desktop -->
      <div class="hidden lg:block">
        <div class="flex items-center justify-end space-x-10">
          <div v-for="item in links" :key="item">
            <nuxt-link :to="item?.url" active-class="text-orange-primary"
              class="koulen text-lg md:text-2xl font-normal text-white hover:text-orange-light">
              {{ item?.title }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- mobile -->
      <button @click="setOpen"
        class="lg:hidden flex items-center justify-center bg-white/20 rounded-md w-8 md:w-10 h-8 md:h-10">
        <Icon name="tabler:menu-2" class="text-white text-xl md:text-2xl" />
      </button>
    </div>
  </nav>

  <!-- Overlay and Sidebar Menu -->
  <div v-if="isOpen" class="fixed grid inset-0 z-50 bg-black bg-opacity-50" @click="setOpen(false)">
    <div
      class="bg-orange-primary h-full w-full md:w-[500px] ml-auto transform transition-transform duration-300"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }" @click.stop>
      <div class="px-5 md:px-10">
        <div class="flex items-center justify-between h-[100px] md:h-[120px]">
            <nuxt-link to="/" @click="setOpen">
            <img src="/public/images/logo.webp" alt="Logo" class="h-12 brightness-0 invert" />
            </nuxt-link>
            <button @click="setOpen" class="flex items-center justify-center bg-orange-primary rounded-md w-8 h-8 ml-auto">
            <Icon name="tabler:x" class="text-white text-xl" />
            </button>
        </div>

        <div class="flex flex-col pt-2">
            <div v-for="item in links" :key="item" class="flex justify-center pb-4 pt-5 border-b-[1px] border-b-white ">
            <nuxt-link @click="setOpen" :to="item?.url"
                class="koulen text-4xl font-normal text-white hover:text-orange-light">
                {{ item?.title }}
            </nuxt-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
