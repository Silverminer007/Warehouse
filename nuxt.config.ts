// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import {VitePWA} from "vite-plugin-pwa";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    vite: {
        plugins: [tailwindcss(), VitePWA(
            {
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true,
                },
                includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
                manifest: {
                    name: 'KjG Warehouse',
                    short_name: 'Warehouse',
                    description: 'See all items the KjG owns, where they are and write packinglists',
                    theme_color: '#ffffff',
                    start_url: "/",
                    icons: [
                        {
                            "src": "/pwa-64x64.png",
                            "sizes": "64x64",
                            "type": "image/png"
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
            })],
    },
    css: ["~/assets/app.css"],
    modules: ["@vite-pwa/nuxt"],
    pwa: {
        client: {
            installPrompt: true
        }
    }
})