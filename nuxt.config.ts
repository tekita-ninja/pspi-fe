// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  components: true,
  routeRules: {
    '/admin/**': { ssr: false },
  },
  app: {
    head: {
      charset: "utf-8",
      title: "PSPI",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "robots",
          content: "noindex",
        },
        {
          name: "og:title",
          content: "PT Prima Synergy Petrolium Indonesia"
        },
      ],
    },
  },
  plugins: [
    "@/plugins/EasyDataTable",
    "@/plugins/QuillEditor",
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    'nuxt-headlessui',
    "@pinia/nuxt",
    "dayjs-nuxt",
    "nuxt-aos",
    "@nuxt/image",
    "nuxt-gtag"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  headlessui: {
    prefix: 'H'
  },
  image: {
    format: ['webp']
  },
  gtag: {
    id: 'G-P7BN5DDMWV'
  }
})