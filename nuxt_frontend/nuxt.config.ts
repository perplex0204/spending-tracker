export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    devServer: {
        port: 8081,
        host: '0.0.0.0',
    },
    nitro: {
        devProxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
            },
        },
    },
    compatibilityDate: '2024-12-12',
    runtimeConfig: {
        apiSecret: 'ttting999',
        public: {
            apiBase: '/api',
        },
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            /* vuetify options */
        },
    },
    modules: ['@nuxtjs/tailwindcss', 'nuxt-mdi', 'vuetify-nuxt-module', '@pinia/nuxt'],
    imports: {
        dirs: ['stores'],
    },
});
