<script setup lang="ts">
import {features} from "@/constants/client/home.content"
</script>
<template>
  <section class="py-8 md:py-16 bg-white">
    <div class="mx-container grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
      <ClientsHomeFeatureItem v-for="(item,index) in features" :key="index" :data="item" />
    </div>
  </section>
</template>