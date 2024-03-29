import Nav from "@/components/custom/nav"
import SubHeader from "@/components/custom/subHeader"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { createEvent, deleteEvent, getCustomer, getEvents, updateEventRequest } from "@/http/api"
import { useEventStore } from "@/store"
import { EventData, ICustomerData, PostEvent } from "@/types"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"



const fetchEvents = async () => {
    const { data } = await getEvents()
    return data
}

const fetchCustomers = async () => {
    const { data } = await getCustomer()
    return data
}

const addEvent = async (data: PostEvent) => {
    await createEvent(data)
    return
}

const updateEvent = async (data: PostEvent) => {
    const { data: res } = await updateEventRequest(data)
    return res
}

const Events = () => {
    const [open, setOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [editId, setEditId] = useState<null | string>(null)
    const { register, handleSubmit, setValue, getValues, resetField } = useForm<PostEvent>()
    const [skeletonCount] = useState([1, 2, 3])
    const { setEvent } = useEventStore()

    useEffect(() => {
        if (!open) {
            resetField('name')
            resetField('customerId')
            setEditId(null)
        }
    }, [open, resetField])

    const { data: events, refetch, isPending } = useQuery<EventData[]>({
        queryKey: ['events'],
        queryFn: fetchEvents
    })

    useEffect(() => {
        if (events) {
            setEvent(events)
        }
    }, [events, setEvent])

    const { data: customers } = useQuery<ICustomerData[]>({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    })

    const { mutate: addMutate } = useMutation({
        mutationKey: ['addEvent'],
        mutationFn: addEvent,
        onSuccess: () => {
            refetch()
            setOpen(false)
        }
    })

    const { mutate: updateMutate } = useMutation({
        mutationKey: ['updateEvent'],
        mutationFn: updateEvent,
        onSuccess: () => {
            refetch()
            setOpen(false)
        }
    })

    const onSubmit = (values: PostEvent) => {
        if (values.name === '' || values.customerId === '') {
            setInputError(true)
        } else {
            setInputError(false)
            if (editId) {

                // updateMutate({ ...values, id: editId })
            } else {
                addMutate(values)
            }
        }
    }
    const handleEdit = async (index: number, id: string) => {
        setValue('name', events![index].name)
        setValue('customerId', events![index].customerId._id)
        setOpen(true)
        setEditId(id)
    }

    const handleDelete = async (id: string) => {
        await deleteEvent(id)
        refetch()
    }

    return (
        <>
            <SubHeader title='Events' subTitle={`${events?.length} Events`}>
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild >
                        <Button variant="outline">Add Events</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Events Details</DialogTitle>
                        </DialogHeader>
                        <Alert variant="destructive" hidden={!inputError}>
                            <div className="flex items-center">
                                <ExclamationTriangleIcon className="" />
                                <AlertTitle className='ml-2'>Fill all details</AlertTitle>
                            </div>
                        </Alert>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer" className="text-right">
                                        Customer
                                    </Label>
                                    <div className="col-span-3">
                                        <Select defaultValue={(editId && getValues('customerId')) || undefined} onValueChange={(id: string) => setValue('customerId', id)} name={register('customerId').name} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="select customer" />
                                            </SelectTrigger>
                                            <SelectContent {...register('customerId')}>
                                                {
                                                    customers && customers.map((customer) =>
                                                        <SelectItem key={customer._id} className="hover:cursor-pointer" value={customer._id} >{customer.name}</SelectItem>
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Event Title
                                    </Label>
                                    <Input className="col-span-3" {...register('name')} placeholder="name the event" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant='outline' className='border-primary'>Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </SubHeader>
            <Nav />
            <Card className='mt-2 flex-1 px-5 pb-5'>
                {
                    isPending ?
                        <div className="grid md:grid-cols-3 gap-3 pt-5">
                            {
                                skeletonCount.map(() =>
                                    <div className="flex flex-col space-y-3 mt-5">
                                        <Skeleton className="h-[125px]  rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[90%]" />
                                            <Skeleton className="h-4 w-[70%]" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <>
                            <div className="grid md:grid-cols-3 gap-3 pt-5">
                                {
                                    events && events.map((event, index) =>
                                        <Card className=" drop-shadow-xl" key={index}>
                                            <div className="px-6 py-2 flex justify-between items-center">
                                                <div>
                                                    <h2 className="">{event.customerId.name}</h2>
                                                    <p className="text-gray-500 text-sm">{event.customerId.mobile}</p>
                                                </div>
                                                <div className="lg:text-lg" >
                                                    <button onClick={() => handleEdit(index, event._id)} className="hover:text-yellow-300 mr-4"><i className="fa-regular fa-pen-to-square "></i></button>
                                                    <button onClick={() => handleDelete(event._id)} className="hover:text-red-500"><i className="fa-regular fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                            <CardContent className="border-y py-2">
                                                <h2 className="text-center">{event.name}</h2>
                                                <div className="flex w-1/2 mx-auto text-gray-500 text-sm justify-between py-1">
                                                    <span><i className="fa-regular fa-folder"></i> 2</span>
                                                    <span><i className="fa-regular fa-image"></i> 2</span>
                                                    <span><i className="fa-regular fa-square-check"></i> 0</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="py-3 justify-between">
                                                <Button size='sm' variant='outline' className="">12547</Button>
                                                <Link to={`/events/${event._id}`}>
                                                    <Button size='sm' variant='outline' className="border-primary bg-transparent hover:bg-primary">Open</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    )
                                }
                            </div>
                            {
                                events?.length === 0 &&
                                <div className="flex items-center justify-center h-full">
                                    <h2 className='text-gray-500'>No customer available</h2>
                                </div>
                            }
                        </>
                }

            </Card >
        </>
    )
}

export default Events