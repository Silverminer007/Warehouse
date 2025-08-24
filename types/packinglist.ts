import type {BaseEntity} from "~/types/base";
import type {Item} from "~/types/inventory";

export interface PackingList extends BaseEntity {
    name: string
    description?: string
    items: PackingListItemRelation[]
    expandedItems: Item[]
}

export interface PackingListItemRelation {
    item: Item
}