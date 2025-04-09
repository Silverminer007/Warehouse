import type {Category, DataArray, Item, Data, Box} from "~/src/types";

export async function fetchItemsByBox(boxId: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?filter[box]=' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch items for Box " + boxId);
    }
    const data = await rawData.json() as DataArray;
    const items: Item[] = data.data as Item[];

    const box = await fetchBox(boxId);

    const categoryStore = new Map<number, Category>();
    (await fetchCategories())?.forEach((category) => {
        categoryStore.set(category.id, category);
    })

    if (categoryStore.size <= 0) {
        return items;
    }

    for (const item of items) {
        item.expandedBox = box;
        if (item.category) {
            item.expandedCategories = [];
            const cat = categoryStore.get(item.category);
            if (cat) {
                item.expandedCategories.push(cat);
            }
        } else {
            item.expandedCategories = [];
            if(!box) {
                continue;
            }
            for(const catId of box.categories) {
                const cat = categoryStore.get(catId);
                if (cat) {
                    item.expandedCategories.push(cat);
                }
            }
        }
    }
    return items;
}

async function fetchCategories(): Promise<Category[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Category/');
    if (!rawData.ok) {
        console.error("Failed to fetch item categories");
        return;
    }
    return (await rawData.json() as DataArray).data as Category[];
}

async function fetchBox(boxId: string | string[]): Promise<Box | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Box/' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch box: " + boxId);
        return;
    }
    return (await rawData.json() as Data).data as Box;
}