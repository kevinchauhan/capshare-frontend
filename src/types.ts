export type Credentials = {
    email: string
    password: string
}

export type CustomerData = {
    name: string
    mobile: string
    id?: string
}

export interface ICustomerData extends CustomerData {
    _id: string
    userId: string
}

export type EventData = {
    _id: string
    name: string
    userId: string
    customerId: ICustomerData
    isCompleted: boolean
}

export type PostEvent = {
    name: string
    customerId: string
    id?: string
}

export type FolderDetails = {
    _id: string
    name: string
    userId: string
    customerId: string
    eventId: string
}

export type FolderData = {
    name: string
    customerId: string
    eventId: string
}

export type FileDetails = {
    data: [{
        _id: string
        name: string
        eventId: string
        originalname: string
        mimetype: string
        path: string
        size: number
        isSelected: boolean
    }]
}