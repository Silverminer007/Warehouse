// src/api/directus.ts
import type { Item } from '~/src/types'

const DIRECTUS_URL = 'https://items.kjg-st-barbara.de'

export async function uploadImageToDirectus(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${DIRECTUS_URL}/files`, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new Error('Fehler beim Upload zu Directus')
    }

    const data = await response.json()
    return data.data.id // Directus file ID
}

export async function patchItemImage(itemId: string, imageId: string) {
    const response = await fetch(`${DIRECTUS_URL}/items/item/${itemId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_image: imageId }),
    })

    if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Items')
    }
}

export async function updateItemPrice(item: Item) {
    const response = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: item.price }),
    })

    if (!response.ok) {
        throw new Error('Fehler beim Speichern des Preises')
    }
}