import SubHeader from '@/components/custom/subHeader'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCustomer, deleteCustomer, getCustomer } from '@/http/api'
import { CustomerData } from '@/types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICustomerData extends CustomerData {
    _id: string
    userId: string
}

const addCustomer = async (data: CustomerData) => {
    const { data: res } = await createCustomer(data)
    return res
}

const fetchCustomers = async () => {
    const { data } = await getCustomer()
    return data
}

const Customer = () => {
    const [open, setOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const { register, handleSubmit, resetField } = useForm<CustomerData>()

    const { data: customers, refetch } = useQuery<ICustomerData[]>({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    })

    useEffect(() => {
        resetField('name')
        resetField('mobile')
    }, [open, resetField])

    const { mutate } = useMutation({
        mutationKey: ['addCustomer'],
        mutationFn: addCustomer,
        onSuccess: () => {
            refetch()
            setOpen(false)
        }
    })

    const onSubmit: SubmitHandler<CustomerData> = (values) => {
        if (values.name === '' || values.mobile === '') {
            setInputError(true)
        } else {
            setInputError(false)
            mutate(values)
        }
    }

    const handleDelete = async (id: string) => {
        await deleteCustomer(id)
        refetch()
    }

    return (
        <>
            <SubHeader title='Customers' subTitle='2 Customer'>
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild >
                        <Button variant="outline">Add Customer</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Customer Details</DialogTitle>
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
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input className="col-span-3" {...register('name')} />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Mobile
                                    </Label>
                                    <Input className="col-span-3" {...register('mobile')} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant='outline' className='border-primary'>Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </SubHeader>
            <Card className='mt-5 flex-1'>
                <div className="px-5 pb-3">
                    {
                        customers && customers.map(customer =>
                            <Fragment key={customer._id}>
                                <div className="flex items-center justify-between my-3">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-full mr-2">KC</div>
                                        <div>
                                            <h3 className='capitalize font-medium'>{customer.name}</h3>
                                            <h5 className='capitalize text-xs text-gray-500'>{customer.mobile}</h5>
                                        </div>
                                    </div>
                                    <div>
                                        <Button variant='outline' className='mr-2' >Edit</Button>
                                        <Button variant='outline' className='hover:bg-destructive' onClick={() => handleDelete(customer._id)} >Delete</Button>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                            </Fragment>
                        )
                    }
                </div>
                {
                    customers?.length === 0 &&
                    <div className="flex items-center justify-center h-full">
                        <h2 className='text-gray-500'>No customer available</h2>
                    </div>
                }
            </Card>
        </>
    )
}

export default Customer