import type {Box, Data, DataArray, Item, PackingList, Room, Shelf, Person} from "~/src/types";

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

export async function fetchShelfs(): Promise<Shelf[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf?sort=name&fields[]=room.*&fields[]=*.*');
    if (!rawData.ok) {
        console.error("Failed to fetch shelfs");
    }
    const data = await rawData.json() as DataArray;
    return data.data as Shelf[];
}

export async function fetchShelfsByRoom(roomId: string | string[]): Promise<Shelf[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Shelf?sort=name&fields[]=room.*&fields[]=*.*&filter[room]=' + roomId);
    if (!rawData.ok) {
        console.error("Failed to fetch shelfs for box " + roomId);
    }
    const data = await rawData.json() as DataArray;
    return data.data as Shelf[];
}

export async function fetchBoxes(): Promise<Box[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name&fields[]=*&fields[]=shelf.*&fields[]=shelf.room.*');
    if (!rawData.ok) {
        console.error("Failed to fetch boxes");
        return;
    }
    return (await rawData.json() as DataArray).data as Box[];
}

export async function fetchBoxesByShelf(shelfId: string | string[]): Promise<Box[] | undefined> {
    let rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name&fields[]=*&fields[]=shelf.*&fields[]=shelf.room.*&filter[shelf]=' + shelfId);
    if (!rawData.ok) {
        console.error("Failed to fetch boxes");
        return;
    }
    return (await rawData.json() as DataArray).data as Box[];
}

export async function fetchItemsByBox(boxId: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&fields[]=*&fields[]=box.*&fields[]=box.shelf.*&fields[]=box.shelf.room.*&filter[box]=' + boxId);
    if (!rawData.ok) {
        console.error("Failed to fetch items for Box " + boxId);
    }
    const data = await rawData.json() as DataArray;
    return data.data as Item[];
}

export async function fetchItemsBySearch(search: string | string[]): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?sort=name&fields[]=*&fields[]=box.*&fields[]=box.shelf.*&fields[]=box.shelf.room.*&search=' + search);
    if (!rawData.ok) {
        console.error("Failed to fetch items by search");
    }
    const data = await rawData.json() as DataArray;
    return data.data as Item[];
}

export async function fetchBoxesBySearchAndNotKioskBox(search: string | string[]): Promise<Box[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?sort=name&filter[kiosk][_eq]=false&search=' + search);
    if (!rawData.ok) {
        console.error("Failed to fetch boxes by search");
    }
    const data = await rawData.json() as DataArray;
    return data.data as Box[];
}

export async function countItemsByBox(boxId: string | string[] | number): Promise<number> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?filter[box][_eq]=' + boxId + '&aggregate[count]=*');
    if (!rawData.ok) {
        console.error("Failed to count items in box " + boxId);
        return -1;
    }
    return (await rawData.json() as Data).data.count as number;
}

export async function getKioskBoxes(): Promise<Box[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/Box?filter[kiosk][_eq]=true');
    if (!rawData.ok) {
        console.error("Failed to get kiosk boxes");
        return [];
    }
    return (await rawData.json() as DataArray).data as Box[];
}

export async function getKioskItems(): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?filter[box][kiosk][_eq]=true&filter[price][_neq]=null');
    if (!rawData.ok) {
        console.error("Failed to get kiosk items");
        return [];
    }
    return (await rawData.json() as DataArray).data as Item[];
}

export async function getKioskItemsWithAndWithoutPrice(): Promise<Item[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/item?filter[box][kiosk][_eq]=true');
    if (!rawData.ok) {
        console.error("Failed to get kiosk items");
        return [];
    }
    return (await rawData.json() as DataArray).data as Item[];
}

export async function getPersons(): Promise<Person[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/person');
    if (!rawData.ok) {
        console.error("Failed to get persons");
        return [];
    }
    return (await rawData.json() as DataArray).data as Person[];
}

export async function searchPersons(search: string): Promise<Person[]> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/person?search=' + search);
    if (!rawData.ok) {
        console.error("Failed to search persons");
        return [];
    }
    return (await rawData.json() as DataArray).data as Person[];
}

export async function getPerson(id: string | string[]): Promise<Person | undefined> {
    const rawData = await fetch('https://items.kjg-st-barbara.de/items/person/' + id);
    if (!rawData.ok) {
        console.error("Failed to load person");
        return undefined;
    }
    return (await rawData.json() as Data).data as Person;
}