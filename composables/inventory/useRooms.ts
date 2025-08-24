import type {Room} from '@/types/inventory'
import type {ApiResponse, ApiResponseArray} from "~/types/base";

export function useRooms() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    async function fetchAllRooms(): Promise<Room[]> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/Room`)
        if (!rawData.ok) {
            throw new Error('Could not fetch rooms')
        }
        return ((await rawData.json()) as ApiResponseArray<Room>).data
    }

    // Raum hinzufügen
    async function addRoom(name: string): Promise<Room> {
        if (!name) throw new Error('Could not add room')

        const res = await fetch(`${DIRECTUS_URL}/items/Room`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name}),
        })

        if (!res.ok) {
            throw new Error('Could not add room')
        }
        return ((await res.json()) as ApiResponse<Room>).data as Room
    }

    return {
        fetchAllRooms,
        addRoom,
    }
}