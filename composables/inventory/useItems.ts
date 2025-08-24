import type {Box, Item} from '~/types/inventory'
import type {ApiResponse, ApiResponseArray} from "~/types/base";

export function useItems() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    async function addItem(name: string, amount: number, box: Box): Promise<Item> {
        if (!name || amount < 1 || !box) throw new Error("Invalid amount or name not set");
        const res = await fetch(`${DIRECTUS_URL}/items/item`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, amount, box: box.id})
        })
        if (!res.ok) {
            throw new Error(`${name} could not be added`);
        }
        const json = await res.json() as ApiResponse<Item>
        const item = json.data as Item
        item.box = box
        return item;
    }

    async function deleteItem(item: Item) {
        const patchResp = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                deleted_at: new Date().toISOString(),
            }),
        })
        if (!patchResp.ok) throw new Error('Fehler beim löschen des Items')
    }

    async function moveItem(item: Item, targetBox: Box) {
        const res = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({box: targetBox.id})
        })
        if (!res.ok) {
            throw new Error(`${item.name} could not be moved`);
        }
    }

    const fetchItems = async (): Promise<Item[]> => {
        const res = await fetch(`${DIRECTUS_URL}/items/item?filter[deleted_at][_eq]=null&sort=name&fields[]=*&fields[]=box.*&fields[]=box.shelf.*&fields[]=box.shelf.room.*&limit=-1`)
        if (!res.ok) {
            console.error(res.statusText);
            throw new Error('Failed to fetch items');
        }
        return (await res.json() as ApiResponseArray<Item>).data
    }

    async function updateAmount(newAmount: number, item: Item) {
        const oldAmount = item.amount
        item.amount = newAmount

        const res = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: newAmount}),
        })

        if (!res.ok) {
            item.amount = oldAmount
            console.error(res)
        }
    }

    async function addOne(item: Item) {
        await updateAmount(item.amount + 1, item)
    }

    async function minusOne(item: Item) {
        if (item.amount > 1) {
            await updateAmount(item.amount - 1, item)
        }
    }

    async function uploadImage(file: File, item: Item) {
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
    }

    async function editItem(item: Item) {
        const patchResp = await fetch(`${DIRECTUS_URL}/items/item/${item.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item),
        })
        if (!patchResp.ok) throw new Error('Fehler beim Aktualisieren des Items')
    }

    return {
        addItem,
        deleteItem,
        moveItem,
        minusOne,
        addOne,
        fetchItems,
        uploadImage,
        editItem
    }
}