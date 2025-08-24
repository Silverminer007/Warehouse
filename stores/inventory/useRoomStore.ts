import type {Room} from '@/types/inventory'
import {useRooms} from '~/composables/inventory/useRooms'
import {defineStore} from "pinia";

export const useRoomStore = defineStore('roomstore', {
    state: () => ({
        rooms: [] as Room[],
        currentRoom: null as Room | null,
        isLoading: false,
        error: null as string | null,
    }),
    getters: {
        getBySearch: (state) =>
            (searchText: string): Room[] | null => {
                return state.rooms.filter((room) =>
                    room.name.toLowerCase().includes(searchText.toLowerCase())
                    || searchText.toLowerCase().includes(room.name.toLowerCase())
                );
            }
    },
    actions: {
        async fetchRooms(force?: boolean): Promise<void> {
            if (this.rooms.length > 0 && !force) return

            try {
                this.isLoading = true
                const {fetchAllRooms} = useRooms();
                this.rooms = await fetchAllRooms();
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Gegenstände'
            } finally {
                this.isLoading = false
            }
        },

        setCurrentRoom(roomId: number | string | string[]) {
            const idNum = Number(roomId);
            this.currentRoom = this.rooms.find((room) => room.id === idNum) || null;
        },

        async addRoom(name: string): Promise<void> {
            const {addRoom} = useRooms();
            const newRoom = await addRoom(name);
            this.rooms.push(newRoom);
        }
    }
})