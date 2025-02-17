<script setup lang="ts">
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { useBlogStore } from "@/app/stores/useBlogStore";

definePageMeta({
  layout: "overlay",
});

const route = useRoute();
const slug = route.params.slug as string;

const controller = useBlogStore();

useHead({
  title: `Publication`,
});

await controller.showPublication(slug);

const formattedDate = (date: Date) => {
  return dayjs(date).format("DD MMMM YYYY");
};
</script>
<template>
  <div class="relative py-24 md:py-36">
    <section class="relative px-5 md:px-20 py-10 space-y-10">
      <div class="text-center border-b-2 border-[#E5613A] pb-3 space-y-5">
        <h4 class="spartan font-semibold text-2xl text-navy-primary">
          {{ controller?.publication?.data?.title }}
        </h4>
        <p class="spartan font-normal text-base text-navy-primary">
          {{ formattedDate(controller?.publication?.data?.publishedAt) }}
        </p>
      </div>
      <div class="mx-auto md:w-2/3">
        <img
          :src="toAssetLink(controller?.publication?.data?.image)"
          alt="Image"
          class="w-3/4 mx-auto"
        />
        <div class="text-justify text-navy-primary">
          <div
            v-html="controller?.publication?.data?.body"
            class="space-y-4 mt-5"
          ></div>
        </div>
        <div class="mt-32 text-left">
          <nuxt-link
            to="/publication"
            class="flex space-x-1 koulen text-3xl font-normal text-orange-primary"
          >
            <Icon class="text-[#E5613A]" name="tabler:chevron-left" />
            <span class="text-[#E5613A]" >BACK</span>
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>
