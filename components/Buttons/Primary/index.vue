<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        url: {
            type: String,
            default: null
        },
        isLink: {
            type: Boolean,
            default: true
        },
        isBlank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            this.$emit('click');
        }
    }
}
</script>

<template>
    <NuxtLink v-if="isLink && !isBlank" :to="url" class="bg-orange-primary rounded-full krona-one inline-block text-sm md:text-lg text-white py-2 md:py-3 px-10 md:px-12">
        {{ text }}
    </NuxtLink>

    <a v-else-if="isLink && isBlank" :href="url" target="_blank" class="bg-orange-primary rounded-full krona-one inline-block text-sm md:text-lg text-white py-2 md:py-3 px-10 md:px-12">
        {{ text }}
    </a>

    <button v-else @click="handleClick" class="bg-orange-primary rounded-full krona-one inline-block text-sm md:text-lg text-white py-2 md:py-3 px-10 md:px-12">
        {{ text }}
    </button>
</template>