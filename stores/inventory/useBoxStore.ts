import type {Box, Shelf} from '@/types/inventory'
import {useBoxes} from "~/composables/inventory/useBoxes";
import {defineStore} from "pinia";

export const useBoxStore = defineStore('boxStore', {
    state: () => ({
        boxes: [] as Box[],
        currentBox: null as Box | null,
        isLoading: false,
        error: null as string | null
    }),
    getters: {
        getByShelfId: (state) => {
            return (shelfId: number | string): Box[] | null => {
                return state.boxes.filter((box) => box?.shelf?.id === Number(shelfId));
            }
        },
        getByRoomId: (state) => {
            return (roomId: number | string): Box[] | null => {
                return state.boxes.filter((box) => box?.shelf?.room?.id === Number(roomId));
            }
        },
        getBySearch: (state) => {
            return (searchText: string): Box[] | null => {
                return state.boxes.filter((box) =>
                    box.name.toLowerCase().includes(searchText.toLowerCase())
                    || searchText.toLowerCase().includes(box.name.toLowerCase())
                );
            }
        }
    },
    actions: {
        async fetchBoxes(force?: boolean): Promise<void> {
            if (this.boxes.length > 0 && !force) return

            try {
                this.isLoading = true
                const {fetchAllBoxes} = useBoxes();
                this.boxes = await fetchAllBoxes();
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Kisten'
            } finally {
                this.isLoading = false
            }
        },

        setCurrentBox(boxId: number | string | string[]) {
            this.currentBox = this.boxes.find(b => b.id === Number(boxId)) || null;
        },

        async moveBoxToShelf(box: Box, targetShelf: Shelf): Promise<void> {
            const {moveBox} = useBoxes();
            await moveBox(box, targetShelf);
            this.boxes = this.boxes.map(b => {
                if (box.id === b.id) {
                    b.shelf = targetShelf;
                }
                return b;
            });
        },

        async addBox(name: string, shelf: Shelf): Promise<void> {
            const {addBox} = useBoxes();
            const newBox = await addBox(name, shelf);
            this.boxes.push(newBox);
        }
    }
})