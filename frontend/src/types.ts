export type RawItem = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    images: string[] | undefined,
    amount: number,
    box: number,
    description: string | undefined,
    category: number | undefined;
}

export type Item = RawItem & {
    expandedBox: Box | undefined,
    expandedCategories: Category[] | undefined,
}

export type Category = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    description: string,
}

export type RawBox = {
    id: number,
    name: string,
    date_created: string,
    date_updated: string,
    size: string,
    shelf: number,
    categories: number[],
    description: string,
    color: string,
    image: string;
}

export type Box = RawBox & {
    expandedCategories: Category[];
    expandedShelf: Shelf;
}

export type RawShelf = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    description: string,
    shelf_image: string,
    room: number
}

export type Shelf = RawShelf & {
    expandedRoom: Room;
}

export type Room = {
    id: number,
    date_created: string,
    date_updated: string,
    name: string,
    room_image: string
}
export type DataArray = {
    data: any[]
}

export type Data = {
    data: any
}