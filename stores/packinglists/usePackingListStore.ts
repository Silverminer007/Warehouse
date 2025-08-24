import {defineStore} from 'pinia'
import type {Item} from '@/types/inventory'
import type {PackingList} from '@/types/packinglist'
import {usePackingList} from "~/composables/packinglists/usePackingList";

export const usePackingListStore = defineStore('packingLists', {
    state: () => ({
        packingLists: [] as PackingList[],   // alle Packlisten mit Items
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        getById: (state) => {
            return (id: number) => state.packingLists.find((l) => l.id === id);
        },
    },

    actions: {
        // 🔄 Alle Packlisten vom Server holen
        async loadPackingLists(force = false) {
            if (this.packingLists.length > 0 && !force) return

            try {
                this.isLoading = true
                const {fetchAllPackingList} = usePackingList();
                this.packingLists = await fetchAllPackingList();
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Packlisten'
            } finally {
                this.isLoading = false
            }
        },

        // 🔄 Einzelne Packliste + Items laden
        async loadPackingListById(id: number, force = false) {
            const existing = this.packingLists.find(l => l.id === id)
            if (existing && !force) return existing

            try {
                this.isLoading = true
                const {fetchPackingList} = usePackingList();
                const list = await fetchPackingList(id)

                // existierende ersetzen oder neu hinzufügen
                const index = this.packingLists.findIndex(l => l.id === id)
                if (index >= 0) {
                    this.packingLists[index] = list
                } else {
                    this.packingLists.push(list)
                }
                return list
            } catch (e: any) {
                this.error = e.message || 'Fehler beim Laden der Packliste'
            } finally {
                this.isLoading = false
            }
        },

        // ➕ Item in Packliste hinzufügen
        async addItemToList(listId: number, item: Item) {
            const list = this.packingLists.find(l => l.id === listId)
            if (!list) return

            // Optimistic UI
            list.expandedItems.push(item)

            const {addItemToPackingList} = usePackingList();
            if (!await addItemToPackingList(listId, item)) {
                // Rollback bei Fehler
                list.expandedItems = list.expandedItems.filter(i => i.id !== item.id)
            }
        },

        // ❌ Item aus Packliste entfernen
        async removeItemFromList(listId: number, item: Item) {
            const list = this.packingLists.find(l => l.id === listId)
            if (!list) return

            // Optimistic UI
            const backup = [...list.expandedItems]
            list.expandedItems = list.expandedItems.filter(i => i.id !== item.id)

            const {removeItemFromPackingList} = usePackingList();
            if (!await removeItemFromPackingList(listId, item)) {
                // Rollback
                list.expandedItems = backup
            }
        }
    }
})