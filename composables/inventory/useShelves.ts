import type {Room, Shelf} from '@/types/inventory'
import type {ApiResponse, ApiResponseArray} from "~/types/base";

export function useShelves() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    async function fetchAllShelves(): Promise<Shelf[]> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/Shelf?fields[]=room.*&fields[]=*.*`)
        if (!rawData.ok) {
            throw new Error("Failed to fetch shelves")
        }
        const data = (await rawData.json()) as ApiResponseArray<Shelf>
        return data.data as Shelf[]
    }

    async function addShelf(name: string, room: Room): Promise<Shelf> {
        if (!name || !room) throw new Error("Failed to addShelf")
        const res = await fetch(`${DIRECTUS_URL}/items/Shelf`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, room: room.id})
        })
        if (!res.ok) {
            throw new Error(`Failed to addShelf ${name}`);
        }
        const shelf = ((await res.json()) as ApiResponse<Shelf>).data
        shelf.room = room
        return shelf
    }

    async function moveShelf(shelf: Shelf, targetRoom: Room) : Promise<Shelf> {
        const res = await fetch(`${DIRECTUS_URL}/items/Shelf/` + shelf.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({room: targetRoom.id})
        })
        if (res.ok) {
            shelf.room = targetRoom
            return shelf
        } else {
            throw new Error('Move shelf failed')
        }
    }

    return {
        fetchAllShelves,
        addShelf,
        moveShelf,
    }
}