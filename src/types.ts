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

export type PostEvent = {
    name: string
    customerId: string
}