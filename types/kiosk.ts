import type {BaseEntity} from "~/types/base";

export interface Person extends BaseEntity {
    firstname: string
    lastname: string
    balance: number
}