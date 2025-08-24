import { ref } from "vue";
import type { Person } from "@/types/kiosk";
import type {ApiResponseArray} from "~/types/base";

export async function usePersonSearch() {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const persons = ref<Person[]>([]);
    const searchText = ref("");

    async function searchPersons(search: string): Promise<Person[]> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/person?search=` + search);
        if (!rawData.ok) {
            console.error("Failed to search persons");
            return [];
        }
        return (await rawData.json() as ApiResponseArray<Person>).data as Person[];
    }

    async function doSearch() {
        persons.value = await searchPersons(searchText.value);
    }

    await doSearch();

    return { persons, searchText, doSearch };
}