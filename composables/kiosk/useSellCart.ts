import { ref } from "vue";
import type { Item } from "@/types/inventory";
import type { Person } from "@/types/kiosk";
import type {ApiResponse, ApiResponseArray} from "~/types/base";

export async function useSellCart(personId: string) {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const person = ref<Person | undefined>();
    const estimatedBalance = ref(0);
    const items = ref<Item[]>([]);
    const shoppingCart = ref(new Map<Item, number>());
    const searchText = ref("");

    async function getPerson(id: string | string[]): Promise<Person | undefined> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/person/` + id);
        if (!rawData.ok) {
            console.error("Failed to load person");
            return undefined;
        }
        return (await rawData.json() as ApiResponse<Person>).data as Person;
    }

    async function getKioskItems(): Promise<Item[]> {
        const rawData = await fetch(`${DIRECTUS_URL}/items/item?filter[box][kiosk][_eq]=true&filter[price][_neq]=null`);
        if (!rawData.ok) {
            console.error("Failed to get kiosk items");
            return [];
        }
        return (await rawData.json() as ApiResponseArray<Item>).data as Item[];
    }

    async function updatePersonBalance(personId: number, newBalance: number): Promise<void> {
        const response = await fetch(`${DIRECTUS_URL}/items/person/` + personId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                balance: newBalance,
            })
        })
        if (!response.ok) {
            console.error("Failed to update person balance");
        }
    }

    async function deleteItem(id: number): Promise<void> {
        const response = await fetch('https://items.kjg-st-barbara.de/items/item/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            console.error("Failed to delete item " + id);
        }
    }

    async function updateItem(id: number, newItem: Partial<Item>): Promise<void> {
        const response = await fetch(`${DIRECTUS_URL}/items/item/` + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem)
        });
        if (!response.ok) {
            console.error("Failed to update amount of item " + id);
        }
    }

    async function init() {
        person.value = await getPerson(personId);
        estimatedBalance.value = person.value?.balance || 0;
        items.value = await getKioskItems();
    }

    function addItemToCart(item: Item) {
        const currentQty = shoppingCart.value.get(item) || 0;
        if (currentQty < item.amount && estimatedBalance.value - item.price >= 0) {
            shoppingCart.value.set(item, currentQty + 1);
            estimatedBalance.value -= item.price;
        }
    }

    async function checkout() {
        if (!person.value) return;
        await updatePersonBalance(person.value.id, estimatedBalance.value);

        for (const [item, qty] of shoppingCart.value) {
            const newAmount = item.amount - qty;
            if (newAmount <= 0) {
                await deleteItem(item.id);
            } else {
                await updateItem(item.id, { amount: newAmount });
            }
            item.amount = newAmount;
        }
        shoppingCart.value.clear();
    }

    async function doSearch() {
        items.value = (await getKioskItems()).filter(i =>
            i.name.toLowerCase().includes(searchText.value.toLowerCase())
        );
    }

    await init();

    return { person, estimatedBalance, shoppingCart, items, searchText, addItemToCart, checkout, doSearch };
}