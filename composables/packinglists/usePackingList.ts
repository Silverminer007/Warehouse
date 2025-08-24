import type {Item} from "@/types/inventory";
import type {ApiResponse, ApiResponseArray} from "@/types/base";
import type {PackingList} from "@/types/packinglist";

export function usePackingList() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    async function fetchPackingList(id: number): Promise<PackingList> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/Packliste/` + id + '?fields[]=*&fields[]=items.item_id.*.*.*.*');
        if (!rawData.ok) {
            throw new Error("Failed to fetch packing list " + id);
        }
        const data = await rawData.json() as ApiResponse<PackingList>;
        const packingList = data.data;
        packingList.expandedItems = packingList.items.map(item => item.item);
        return packingList;
    }

    async function fetchAllPackingList(): Promise<PackingList[]> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/Packliste?fields[]=*&fields[]=items.item_id.*.*.*.*`);
        if (!rawData.ok) {
            throw new Error("Failed to fetch packing lists");
        }
        const data = await rawData.json() as ApiResponseArray<PackingList>;
        const packingLists = data.data;
        for (const packing of packingLists) {
            packing.expandedItems = packing.items.map(item => item.item);
        }
        return packingLists;
    }

    async function removeItemFromPackingList(packingListId: number, item: Item): Promise<boolean> {
        const res = await fetch(`${DIRECTUS_URL}/items/Packliste_item`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: {filter: {item_id: {_eq: item.id}}}
            })
        });

        return res.ok;
    }

    async function addItemToPackingList(packingListId: number, item: Item): Promise<boolean> {
        const res = await fetch(`${DIRECTUS_URL}/items/Packliste_item`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Packliste_id: packingListId,
                item_id: item.id,
            })
        });

        return res.ok;
    }

    return {
        fetchAllPackingList,
        fetchPackingList,
        addItemToPackingList,
        removeItemFromPackingList,
    };
}