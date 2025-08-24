import type {Room, Shelf} from '@/types/inventory'
import {useShelves} from "~/composables/inventory/useShelves";
import {defineStore} from "pinia";

export const useShelfStore = defineStore('shelvestore', {
    state: () => ({
        shelves: [] as Shelf[],
        currentShelf: null as Shelf | null,
        isLoading: false,
        error: null as string | null,
    }),
    getters: {
        getByRoomId: (state) =>
            (roomId: number | string): Shelf[] | null => {
                return state.shelves.filter((shelf) => shelf?.room?.id === Number(roomId));
            },
        getBySearch: (state) =>
            (searchText: string): Shelf[] | null => {
                return state.shelves.filter((shelf) =>
                    shelf.name.toLowerCase().includes(searchText.toLowerCase())
                    || searchText.toLowerCase().includes(shelf.name.toLowerCase())
                );
            }
    },
    actions: {
        async fetchShelves(force?: boolean): Promise<void> {
            if (this.shelves.length > 0 && !force) return

            try {
                this.isLoading = true
                const {fetchAllShelves} = useShelves();
                this.shelves = await fetchAllShelves();
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Regale'
            } finally {
                this.isLoading = false
            }
        },

        setCurrentShelf(shelfId: number | string | string[]) {
            const numId = Number(shelfId);
            this.currentShelf = this.shelves.find(s => s.id === numId) || null;
        },

        async moveShelfToRoom(shelf: Shelf, targetRoom: Room): Promise<void> {
            const {moveShelf} = useShelves();
            await moveShelf(shelf, targetRoom);
            this.shelves = this.shelves.map(s => {
                if (s.id === shelf.id) {
                    s.room = targetRoom;
                }
                return s;
            })
        },

        async addShelfToRoom(name: string, room: Room) {
            const {addShelf} = useShelves();
            const tempShelf = {name: name, room: room, id: -1} as Shelf;
            const tempShelfPosition = this.shelves.push(tempShelf) - 1;
            const newShelf = await addShelf(name, room);
            this.shelves.splice(tempShelfPosition);
            this.shelves.push(newShelf);
        }
    }
})