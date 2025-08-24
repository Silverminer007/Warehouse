import {ref} from 'vue'
import type {Item} from '@/types/inventory'

export function useKioskItems() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const items = ref<Item[]>([])
    const currentItem = ref<Item | null>(null)
    const showUploadDialog = ref(false)

    // ------------------------------
    // Direkt integrierte Fetch-Funktion
    // ------------------------------
    async function fetchItems() {
        try {
            const response = await fetch(`${DIRECTUS_URL}/items/item?filter[box][kiosk][_eq]=true`)
            if (!response.ok) throw new Error('Failed to get kiosk items')
            const data = (await response.json() as { data: Item[] }).data
            items.value = data || []
        } catch (err) {
            console.error(err)
            items.value = []
        }
    }

    // ------------------------------
    // Preis aktualisieren
    // ------------------------------
    async function updatePrice(item: Item) {
        try {
            await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({price: item.price}),
            })
        } catch (err) {
            console.error('Fehler beim Speichern des Preises', err)
            await fetchItems()
        }
    }

    // ------------------------------
    // Bild hochladen
    // ------------------------------
    async function handleImageUpload(file: File, item: Item) {
        try {
            // Upload zu Directus
            const formData = new FormData()
            formData.append('file', file)
            const uploadResp = await fetch(`${DIRECTUS_URL}/files`, {
                method: 'POST',
                body: formData,
            })
            if (!uploadResp.ok) throw new Error('Fehler beim Upload zu Directus')
            const fileData = await uploadResp.json()
            const fileId = fileData.data.id

            // Bild im Item patchen
            const patchResp = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({item_image: fileId}),
            })
            if (!patchResp.ok) throw new Error('Fehler beim Aktualisieren des Items')

            await fetchItems()
        } catch (err) {
            console.error(err)
            alert('Fehler beim Upload oder Speichern')
        }
    }

    return {
        items,
        currentItem,
        showUploadDialog,
        fetchItems,
        updatePrice,
        handleImageUpload,
    }
}