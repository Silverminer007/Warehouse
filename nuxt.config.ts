// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    vite: {
        plugins: [tailwindcss()],
    },
    css: ["~/assets/app.css"],
    modules: ["@vite-pwa/nuxt"],
    pwa: {
        client: {
            installPrompt: true
        },
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true,
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
            name: 'KjG Warehouse',
            short_name: 'Warehouse',
            id: "boxes.kjg-st-barbara.de",
            orientation: 'any',
            launch_handler: {
                client_mode: "navigate-existing"
            },
            description: 'See all items the KjG owns, where they are and write packinglists',
            theme_color: '#ffffff',
            start_url: "/",
            icons: [
                {
                    "src": "/pwa-64x64.png",
                    "sizes": "64x64",
                    "type": "image/png",
                    "purpose": "any maskable"
                },
                {
                    "src": "/pwa-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/pwa-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/maskable-icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        }
    }
})