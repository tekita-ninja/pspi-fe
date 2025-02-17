<script setup lang="ts">
import { goals } from '@/constants/client/about.content';
</script>
<template>
  <div class="space-y-5 md:space-y-10 md:pt-10">
    <div class="text-center">
      <h1 class="koulen  text-large-client text-orange-primary">
        IMPIAN KITA
      </h1>
    </div>
    <div v-for="item in goals" :key="item.id">
      <div class="space-y-2">
        <h6 class="spartan text-navy-primary font-semibold text-base md:text-2xl text-justify">
          {{ item?.title }}
        </h6>
        <P class="spartan text-navy-primary font-normal text-base md:text-2xl leading-7 text-justify">
          {{ item?.desc }}
        </P>
      </div>
    </div>
  </div>
</template>