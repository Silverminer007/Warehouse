export type Item = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    item_image: string,
    amount: number,
    price: number,
    box: Box | undefined,
    description: string | undefined,
    category: Category | undefined;
}

export type Category = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    description: string,
}

export type Box = {
    id: number,
    name: string,
    date_created: string,
    date_updated: string,
    size: string,
    shelf: Shelf | undefined,
    description: string,
    color: string,
    image: string;
}

export type Shelf = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    description: string,
    shelf_image: string,
    room: Room
}

export type Room = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    room_image: string,
    description: string,
}

export type Person = {
    id: number,
    firstname: string,
    lastname: string,
    balance: number,
}

export type PackingList = {
    id: number,
    name: string,
    date_created: string,
    date_updated: string,
    description: string,
    items: PackingListItemRelation[],
    expandedItems: Item[]
}

export type DataArray = {
    data: any[]
}

export type Data = {
    data: any
}

export type PackingListItemRelation = {
    item_id: Item
}