import type {BaseEntity} from "~/types/base";

export interface Room extends BaseEntity {
    name: string
    room_image: string
    description?: string
}

export interface Shelf extends BaseEntity {
    name: string
    description?: string
    shelf_image: string
    room?: Room | null
}

export interface Box extends BaseEntity {
    name: string
    size: string
    description?: string
    color: string
    image: string
    shelf?: Shelf | null
}

export interface Category extends BaseEntity {
    name: string
    description?: string
}

export interface Item extends BaseEntity {
    name: string
    item_image: string
    amount: number
    price: number
    description?: string
    category?: Category | null
    box?: Box | null
}