<script setup lang="ts">
import { useUtilityStore } from '@/app/stores/useUtilityStore';

const utility = useUtilityStore()
</script>

<template>
  <footer class="relative py-10 lg:p-20 bg-white overflow-hidden">
    <div class="absolute z-10 flex-2 w-56 bottom-52 lg:w-72 md:left-[-10px] md:bottom-52 lg:left-0 lg:bottom-64 ">
      <img src="/public/images/footer/logo.svg" class="absolute" alt="logo-footer">
    </div>

    <div class="relative flex z-20 justify-center md:gap-10">
      <div class="flex-1 flex flex-col sm:flex-row justify-center md:justify-end gap-8 sm:gap-8 md:gap-10 xl:gap-32 md:pr-12 xl:pr-32">
        <div class="flex flex-col items-center justify-center sm:block">
            <h1 class="krona-one text-orange-primary text-lg md:text-2xl mb-3 sm:mb-5">KONTAK KAMI</h1>
            <div class="flex  items-center sm:items-start flex-col space-y-2 md:space-y-4 ">
              <nuxt-link to="tel:082278831282" class="spartan flex space-x-2">
                <div
                  class="flex items-center justify-center rounded-full text-white bg-orange-primary text-base md:text-xl w-6 md:w-8 h-6 md:h-8">
                  <Icon name="tabler:phone" />
                </div>
                <span class="text-orange-primary font-medium text-base md:text-lg">
                  {{ utility.utilityClient?.mainWhatsapp || '0822 7883 1282' }}
                </span>
              </nuxt-link>
              <nuxt-link :to="`${utility.utilityClient?.mainEmail || 'admin@primasynergy.com'}`" class="spartan flex space-x-2 underline decoration-1 decoration-orange-light">
                <div
                  class="flex items-center justify-center rounded-full text-white bg-orange-primary text-base md:text-xl w-6 md:w-8 h-6 md:h-8">
                  <Icon name="tabler:mail" />
                </div>
                <span class="text-orange-primary font-medium text-base md:text-lg">
                  {{ utility.utilityClient?.mainEmail || 'admin@primasynergy.com' }}
                </span>
              </nuxt-link>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-center sm:block ">
            <h1 class="krona-one text-orange-primary text-xl md:text-2xl mb-3 sm:mb-5">ALAMAT</h1>
            <div class="spartan font-bold text-orange-primary text-sm md:text-lg ">
              {{ utility.utilityClient?.appName }}
            </div>
            <div class="spartan font-normal text-center sm:text-start text-orange-primary text-sm md:text-lg max-w-xs mx-auto">
              {{ utility.utilityClient?.mainAddress }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
