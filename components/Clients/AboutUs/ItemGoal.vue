<script setup lang="ts">
type Props = {
  title: string;
  description: string;
};
defineProps<Props>();
</script>

<template>
  <li class="relative flex gap-3 sm:gap-16 md:gap-10 lg:gap-20 max-w-xl pb-20 items-baseline">
    <div class="max-w-8 shrink-0 flex-1">
      <div
        class="before:absolute before:left-[6.5px] sm:before:left-[1.9%] md:before:left-[9.5px] lg:before:left-[13px] before:h-full before:w-[2px] sm:before:w-1 before:bg-[#DDDDDD] shrink-0"
      >
        <img
          class="w-4 sm:w-6 lg:w-20 shrink-0"
          src="/public/images/about/bullet-timeline.svg"
          alt="bullet-timeline"
        />
      </div>
    </div>
    <div class="flex-1 spartan text-orange-primary grid gap-2 sm:translate-y-[-5px]">
      <h3 class="font-bold text-xl sm:text-3xl md:text-2xl lg:text-3xl">{{ title }}</h3>
      <p class="text-md sm:text-xl lg:text-2xl font-normal lg:leading-relaxed text-justify">
        {{ description }}
      </p>
    </div>
  </li>
</template>
