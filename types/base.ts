export interface BaseEntity {
    id: number
    date_created: string
    date_updated: string
}

export interface ApiResponse<T> {
    data: T
}

export interface ApiResponseArray<T> {
    data: T[]
}