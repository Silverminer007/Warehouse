import type {Box, Data, DataArray, Item, PackingList, Room, Shelf} from "~/src/types";

export async function fetchRoom(roomId: string | string[]): Promise<Room | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Room/' + roomId);
    if (!rawData.ok) {
        console.error("Failed to fetch room: " + roomId);
        return;
    }
    return (await rawData.json() as Data).data as Room;
}

export async function fetchShelf(shelfId: string | string[]): Promise<Shelf | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf/' + shelfId + '?fields[]=*.*');
    if (!rawData.ok) {
        console.error("Failed to fetch shelf: " + shelfId);
        return;
    }
    return (await rawData.json() as Data).data as Shelf;
}

export async function fetchBox(boxId: string | string[]): Promise<Box | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Box/' + boxId + '?fields[]=*.*.*');
    if (!rawData.ok) {
        console.error("Failed to fetch box: " + boxId);
        return;
    }
    return (await rawData.json() as Data).data as Box;
}

export async function fetchPackingList(packingListId: string | string[]): Promise<PackingList> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Packliste/' + packingListId + '?fields[]=*&fields[]=items.item_id.*.*.*.*');
    if (!rawData.ok) {
        console.error("Failed to fetch packing list " + packingListId);
    }
    const data = await rawData.json() as Data;// TODO
    const packingList = data.data as PackingList;
    packingList.expandedItems = packingList.items.map(item => item.item_id);
    return packingList;
}

export async function fetchPackingLists(): Promise<PackingList[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Packliste?fields[]=name,id');
    if (!rawData.ok) {
        console.error("Failed to fetch packing lists");
        return;
    }
    return (await rawData.json() as DataArray).data as PackingList[];
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
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf?sort=name&fields[]=*.*&filter[room]=' + roomId);
    if (!rawData.ok) {
        console.error("Failed to fetch shelfs for box " + roomId);
    }
    const data = await rawData.json() as DataArray;
    return data.data as Shelf[];
}

export async function fetchBoxesByShelf(shelfId: string | string[]): Promise<Box[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name&fields[]=*.*.*&filter[shelf]=' + shelfId);
    if (!rawData.ok) {
        console.error("Failed to fetch boxes");
        return;
    }
    return (await rawData.json() as DataArray).data as Box[];
}

export async function fetchItemsByBox(boxId: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&fields[]=*.*.*.*&filter[box]=' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch items for Box " + boxId);
    }
    const data = await rawData.json() as DataArray;
    return data.data as Item[];
}

export async function fetchItemsBySearch(search: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&fields[]=*.*.*.*&search=' + search);
    if (!rawData.ok) {
        console.error("Failed to fetch items by search");
    }
    const data = await rawData.json() as DataArray;
    return data.data as Item[];
}