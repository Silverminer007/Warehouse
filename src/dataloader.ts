import type {Category, DataArray, Item, Data, Box, Shelf, Room} from "~/src/types";

export async function fetchCategory(categoryId: string | string[]): Promise<Category | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Category/' + categoryId);
    if (!rawData.ok) {
        console.error("Failed to fetch category: " + categoryId);
        return;
    }
    return (await rawData.json() as Data).data as Category;
}

export async function fetchRoom(roomId: string | string[]): Promise<Room | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Room/' + roomId);
    if (!rawData.ok) {
        console.error("Failed to fetch room: " + roomId);
        return;
    }
    return (await rawData.json() as Data).data as Room;
}

export async function fetchShelf(shelfId: string | string[], expand?: boolean): Promise<Shelf | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf/' + shelfId);
    if (!rawData.ok) {
        console.error("Failed to fetch shelf: " + shelfId);
        return;
    }
    const shelf = (await rawData.json() as Data).data as Shelf;
    if(expand && shelf) {
        const room = await fetchRoom(shelf.room.toString());
        if(room) {
            shelf.expandedRoom = room;
        }
    }
    return shelf;
}

export async function fetchBox(boxId: string | string[], expand?: boolean): Promise<Box | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Box/' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch box: " + boxId);
        return;
    }
    const box = (await rawData.json() as Data).data as Box
    if(expand && box) {
        const shelf = await fetchShelf(box.shelf.toString(), true);
        if(shelf) {
            box.expandedShelf = shelf;
        }
    }
    return box;
}

export async function fetchItem(itemId: string | string[], expand?: boolean): Promise<Item | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Item/' + itemId);
    if (!rawData.ok) {
        console.error("Failed to fetch item: " + itemId);
        return;
    }
    const item = (await rawData.json() as Data).data as Item;
    if(expand && item) {
        const box = await fetchBox(item.box.toString());
        if(box) {
            item.expandedBox = box;
        }
    }
}

export async function fetchCategories(): Promise<Category[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Category/');
    if (!rawData.ok) {
        console.error("Failed to fetch item categories");
        return;
    }
    return (await rawData.json() as DataArray).data as Category[];
}

export async function fetchRooms(): Promise<Room[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Room/');
    if (!rawData.ok) {
        console.error("Failed to fetch rooms");
        return;
    }
    return (await rawData.json() as DataArray).data as Room[];
}

export async function fetchShelfsByRoom(roomId: string | string[]): Promise<Shelf[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf?sort=name&filter[room]=' + roomId);
    if (!rawData.ok) {
        console.error("Failed to fetch shelfs for box " + roomId);
    }
    const data = await rawData.json() as DataArray;
    const shelfs: Shelf[] = data.data as Shelf[];

    const room = await fetchRoom(roomId);

    for (const shelf of shelfs) {
        if(room) {
            shelf.expandedRoom = room;
        }
    }
    return shelfs;
}

export async function fetchBoxesByShelf(shelfId: string | string[]): Promise<Box[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name&filter[shelf]=' + shelfId);
    if (!rawData.ok) {
        console.error("Failed to fetch boxes");
        return;
    }
    const boxes = (await rawData.json() as DataArray).data as Box[];

    const shelf = await fetchShelf(shelfId);

    for (const box of boxes) {
        if(shelf) {
            box.expandedShelf = shelf;
        }
    }
    return boxes;
}

export async function fetchItemsByBox(boxId: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&filter[box]=' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch items for Box " + boxId);
    }
    const data = await rawData.json() as DataArray;
    const items: Item[] = data.data as Item[];

    const box = await fetchBox(boxId, false);

    const categoryStore = new Map<number, Category>();
    (await fetchCategories())?.forEach((category) => {
        categoryStore.set(category.id, category);
    })

    if (categoryStore.size <= 0) {
        return items;
    }

    for (const item of items) {
        item.expandedBox = box;
        item.expandedCategories = [];
        if (item.category) {
            const cat = categoryStore.get(item.category);
            if (cat) {
                item.expandedCategories.push(cat);
            }
        }
    }
    return items;
}

export async function fetchShelfs(): Promise<Shelf[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf?sort=name');
    if (!rawData.ok) {
        console.error("Failed to fetch shelfs");
    }
    const data = await rawData.json() as DataArray;
    const shelfs: Shelf[] = data.data as Shelf[];

    const rooms = await fetchRooms() || [];
    const roomsMap = new Map<number, Room>();
    rooms.forEach((room) => {
        roomsMap.set(room.id, room);
    })

    for (const shelf of shelfs) {
        const room = roomsMap.get(shelf.room);
        if(room) {
            shelf.expandedRoom = room;
        }
    }
    return shelfs;
}

export async function fetchBoxes(): Promise<Box[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name');
    if (!rawData.ok) {
        console.error("Failed to fetch boxes");
        return;
    }
    const boxes = (await rawData.json() as DataArray).data as Box[];

    const shelfs = await fetchShelfs() || [];
    const shelfsMap = new Map<number, Shelf>();
    shelfs.forEach((shelf) => {
        shelfsMap.set(shelf.id, shelf);
    })

    const categoryStore = new Map<number, Category>();
    (await fetchCategories())?.forEach((category) => {
        categoryStore.set(category.id, category);
    })

    if (categoryStore.size <= 0) {
        return boxes;
    }

    for (const box of boxes) {
        const shelf = shelfsMap.get(box.shelf);
        if(shelf) {
            box.expandedShelf = shelf;
        }
    }
    return boxes;
}

export async function fetchItemsBySearch(search: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&search=' + search);
    if (!rawData.ok) {
        console.error("Failed to fetch items by search");
    }
    const data = await rawData.json() as DataArray;
    const items: Item[] = data.data as Item[];

    const boxes = await fetchBoxes() || [];
    const boxesMap = new Map<number, Box>();
    boxes.forEach((box) => {
        boxesMap.set(box.id, box);
    })

    const categoryStore = new Map<number, Category>();
    (await fetchCategories())?.forEach((category) => {
        categoryStore.set(category.id, category);
    })

    if (categoryStore.size <= 0) {
        return items;
    }

    for (const item of items) {
        const box = boxesMap.get(item.box);
        if (box) {
            item.expandedBox = box;
        }
        item.expandedCategories = [];
        if (item.category) {
            const cat = categoryStore.get(item.category);
            if (cat) {
                item.expandedCategories.push(cat);
            }
        }
    }
    return items;
}