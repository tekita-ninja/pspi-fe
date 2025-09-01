<script setup lang="ts">
import { useUtilityStore } from '@/app/stores/useUtilityStore';
const utility = useUtilityStore()
</script>
<template>
  <section
    class="px-5 md:px-24 bg-[url('/public/images/home/bg-jumbotron.png')] bg-cover bg-bottom h-[50vh] md:h-[70vh] lg:h-[100vh] overflow-hidden">
    <div class="h-full flex flex-col gap-5 justify-center items-start space-y-5">
      <div class="flex justify-end w-full">
        <img src="/public/images/home/full-dots.svg" class="h-32" />
      </div>
      <div class="flex relative w-full">
        <div class="relative z-20 2xl:z-0">
          <div class="absolute hidden md:block top-[-70px] left-[-70px]">
            <img src="/public/images/home/half-dots.svg" class="h-32" alt="ellips-bg">
          </div>
          <div>
            <h1 class="koulen text-[45px] md:text-[75px] lg:text-[100px] leading-[0.9] text-white drop-shadow">
              <span data-aos-duration="1000" class="block">WHERE ENERGY</span>
              <span data-aos-duration="1500" class="block">MEETS EXCELLENCE</span>
            </h1>
            <a :href="toAssetLink(utility.utilityClient.fileCompro || '')" target="_blank" rel="noopener noreferrer"
              class="bg-[#00528C] cursor-pointer relative z-10 w-full md:w-1/2 text-xs md:text-base mt-4 flex items-center justify-center px-6 h-8 md:px-12 md:h-10 rounded-full text-white">
              Unduh Company Profile
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <div
        class="absolute  right-[-160px] bottom-[-140px] md:right-[-160px] md:bottom-[-140px] lg:right-[-360px] lg:bottom-[-400px]">
        <img src="/images/home/ellips.svg" class="h-[400px] sm:h-[500px] md:h-[700px] lg:h-[1100px]" alt="ellips-bg" />
      </div>
      <div
        class="absolute right-[-50px] md:right-[-120px] xl:right-[-190px] bottom-[-70px]  sm:bottom-[-90px] md:bottom-[-100px] xl:bottom-[-140px]">
        <img src="/images/home/truck.png" class="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[620px] xl:w-[820px]"
          alt="truck" />
      </div>
    </div>
  </section>
</template>
