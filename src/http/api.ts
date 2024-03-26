import { Credentials, CustomerData, PostEvent } from "@/types";
import { api } from "./client";

export const login = (credentials: Credentials) => api.post('/auth/login', credentials)
export const self = () => api.get('/auth/self')
export const logout = () => api.post('/auth/logout')

export const createCustomer = (data: CustomerData) => api.post('/customer/register', data)
export const getCustomer = () => api.get('/customer')
export const updateCustomerRequest = (data: CustomerData) => api.put('/customer/update', data)
export const deleteCustomer = (id: string) => api.delete('/customer', { data: { id } })

export const getEvents = () => api.get('/event')
export const createEvent = (data: PostEvent) => api.post('/event/register', data)