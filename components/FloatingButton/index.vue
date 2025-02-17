<script setup lang="ts">
import { useUtilityStore } from '@/app/stores/useUtilityStore';

const utility = useUtilityStore()
</script>
<template>
    <div>
        <NuxtLink target="_blank"
            :to="`https://wa.me/62${toWaNumber(utility.utilityClient?.mainWhatsapp || '6282278831282')}`"
            class="fixed z-40 bottom-16 md:bottom-32 right-5 md:right-10">
            <Icon class="h-12 w-12 md:h-16 md:w-16 drop-shadow-lg" name="logos:whatsapp-icon" />
        </NuxtLink>
        <div class="fixed z-40 bottom-6 md:bottom-16 right-5 md:right-10">
            <img class="w-24 md:w-32" src="/images/pertamina.png" alt="pertamina">
        </div>
    </div>
</template>