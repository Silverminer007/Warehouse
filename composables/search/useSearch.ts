import type { Item } from "@/types/inventory";
import type {ApiResponseArray} from "~/types/base";

export async function useSearch() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const route = useRoute();
    const searchText = ref<string>((route.query.search as string) || "");
    const items = ref<Item[]>([]);

    const loadItemsBySearch = async () => {
        const rawData = await fetch(`${DIRECTUS_URL}/items/item?sort=name&fields[]=*&fields[]=box.*&fields[]=box.shelf.*&fields[]=box.shelf.room.*&search=` + searchText.value);
        if (!rawData.ok) {
            console.error("Failed to fetch items by search");
        }
        const data = await rawData.json() as ApiResponseArray<Item>;
        return data.data as Item[];
    }

    async function doSearch() {
        if (searchText.value.length === 0) {
            items.value = [];
            return;
        }
        items.value = await loadItemsBySearch();
    }

    if (searchText.value.length > 0) {
        items.value = await loadItemsBySearch();
    }

    return { searchText, items, doSearch };
}