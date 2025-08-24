import type {Box, Shelf} from '@/types/inventory'
import type {ApiResponse, ApiResponseArray} from "~/types/base";

export function useBoxes() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    async function fetchAllBoxes(): Promise<Box[]> {
        const res = await fetch(`${DIRECTUS_URL}/items/Box?fields[]=*.*.*&limit=-1`)
        const json = await res.json() as ApiResponseArray<Box>
        return json.data;
    }

    async function addBox(name: string, shelf: Shelf): Promise<Box> {
        if (!name || !shelf) throw new Error("name and shelf is required");
        const res = await fetch(`${DIRECTUS_URL}/items/Box`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, shelf: shelf.id})
        })
        if (!res.ok) {
            throw new Error("Failed to addBox")
        }
        const box = ((await res.json()) as ApiResponse<Box>).data as Box
        box.shelf = shelf
        return box;
    }

    async function moveBox(box: Box, moveToShelf: Shelf) {
        const res = await fetch(`${DIRECTUS_URL}/items/Box/` + box.id, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({shelf: moveToShelf.id})
        })
        if (!res.ok) {
            throw new Error("Failed to moveBox")
        }
        box.shelf = moveToShelf
    }

    return {
        fetchAllBoxes,
        addBox,
        moveBox,
    }
}