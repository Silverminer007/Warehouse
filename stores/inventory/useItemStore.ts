import type {Box, Item} from '@/types/inventory'
import {useItems} from "~/composables/inventory/useItems";
import {defineStore} from "pinia";

export const useItemStore = defineStore('itemStore', {
    state: () => ({
        items: [] as Item[],
        currentItem: null as Item | null,
        isLoading: false,
        error: null as string | null
    }),
    getters: {
        getByBoxId: (state) =>
            (boxId: number | string): Item[] | null => {
                return state.items.filter((item) => item?.box?.id === Number(boxId));
            },
        getByShelfId: (state) =>
            (shelfId: number | string): Item[] | null => {
                return state.items.filter((item) => item?.box?.shelf?.id === Number(shelfId));
            },
        getByRoomId: (state) =>
            (roomId: number | string): Item[] | null => {
                return state.items.filter((item) => item?.box?.shelf?.room?.id === Number(roomId));
            },
        getBySearch: (state) =>
            (searchText: string): Item[] | null => {
                return state.items.filter((item) =>
                    item.name.toLowerCase().includes(searchText.toLowerCase())
                    || searchText.toLowerCase().includes(item.name.toLowerCase())
                );
            }
    },
    actions: {
        async fetchItems(force?: boolean): Promise<void> {
            if (this.items.length > 0 && !force) return

            try {
                this.isLoading = true
                const {fetchItems} = useItems();
                this.items = await fetchItems();
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Gegenstände'
            } finally {
                this.isLoading = false
            }
        },

        setCurrentItem(itemId: number | string | string[]) {
            this.currentItem = this.items.find(i => i.id === Number(itemId)) || null;
        },

        updateItem(item: Item) {
            //this.items = this.items.filter(i => i.id !== item.id);
            //this.items.push(item);
            for (const [index, element] of this.items.entries()) {
                if (element.id === item.id) {
                    this.items[index] = item;
                }
            }
        },

        async addItem(name: string, amount: number, box: Box): Promise<void> {
            const {addItem} = useItems();
            const tempItem = {name: name, amount: amount, box: box, id: -1} as Item;
            const tempItemPosition = this.items.push(tempItem) - 1;
            const newItem = await addItem(name, amount, box);
            this.items.splice(tempItemPosition, 1);
            this.items.push(newItem);
        },

        async deleteItem(item: Item): Promise<void> {
            const {deleteItem} = useItems();
            if (this.items.includes(item)) {
                this.items.splice(this.items.indexOf(item), 1);
            }
            await deleteItem(item);
        },

        async addOne(item: Item): Promise<void> {
            const {addOne} = useItems();
            await addOne(item);
        },

        async minusOne(item: Item): Promise<void> {
            const {minusOne} = useItems();
            await minusOne(item);
        },

        async moveItemToBox(item: Item, targetBox: Box) {
            const {moveItem} = useItems();
            item.box = targetBox;
            this.updateItem(item);
            await moveItem(item, targetBox);
        },

        async uploadImage(file: File, item: Item | null) {
            if (!item) {
                return
            }
            const {uploadImage} = useItems();
            await uploadImage(file, item);
            this.updateItem(item);
        },

        async editItem(item: Item | null): Promise<void> {
            if (!item) {
                return
            }
            const {editItem} = useItems();
            await editItem({name: item.name, amount: item.amount, description: item.description, id: item.id} as Item);
            this.updateItem(item);
        }
    }
})