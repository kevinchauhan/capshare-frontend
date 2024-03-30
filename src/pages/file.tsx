import SubHeader from "@/components/custom/subHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createFile, getFiles } from "@/http/api"
import { useEventStore } from "@/store"
import { EventData, FileDetails } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { EmptyObject } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { partial } from "filesize";
import { Skeleton } from "@/components/ui/skeleton"
const filesize = partial({ standard: "jedec" });

const uploadImage = async (files: File[], eventId: string) => {
    try {
        const formData = new FormData()
        files.forEach(file => {
            formData.append('logo', file)
        })
        const response = await createFile(eventId, formData)
        console.log('Image uploaded successfully:', response.data)
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const fetchFiles = async (id: string) => {
    const { data } = await getFiles(id)
    return data
}

const File = () => {
    const [open, setOpen] = useState(false)
    const [eventData, setEventData] = useState<EventData | EmptyObject>({})
    const { events } = useEventStore()
    const { id } = useParams()
    const [skeletonCount] = useState([1, 2, 3, 4, 5, 6])
    const { data: files, isPending } = useQuery<FileDetails>({
        queryKey: ['files'],
        queryFn: () => fetchFiles(id!)
    })

    useEffect(() => {
        if (events) {
            const currentEvent = events.filter(event => event._id === id)
            setEventData(currentEvent[0])
        }
    }, [events, id])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        uploadImage(acceptedFiles, id!)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <Breadcrumb className="mb-3">
                <BreadcrumbList>
                    {/* <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator /> */}
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/events">Events</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{eventData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <SubHeader title={eventData?.name} subTitle=''>
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild >
                        <Button variant="outline">Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Customer Details</DialogTitle>
                        </DialogHeader>
                        {/* <Alert variant="destructive" hidden={!inputError}>
                            <div className="flex items-center">
                                <ExclamationTriangleIcon className="" />
                                <AlertTitle className='ml-2'>Fill all details</AlertTitle>
                            </div>
                        </Alert> */}
                        {/* <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input className="col-span-3" {...register('name')} placeholder="folder name" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant='outline' className='border-primary'>Save</Button>
                            </DialogFooter>
                        </form> */}
                    </DialogContent>
                </Dialog>
            </SubHeader>

            <Card className='mt-5 flex-1 p-5'>
                {isPending &&
                    <div className="grid md:grid-cols-6 gap-3 pt-5">
                        {
                            skeletonCount.map(() =>
                                <div className="flex flex-col mt-5">
                                    <Skeleton className="h-[125px]  rounded-xl" />
                                </div>
                            )
                        }
                    </div>
                }

                {files && files?.data.length < 1 &&
                    <div className="flex items-center justify-center h-full flex-wrap dark:text-gray-400" {...getRootProps()}>
                        {
                            isDragActive ?
                                <div className="text-center">
                                    <i className="fa-solid fa-cloud-arrow-up text-5xl"></i>
                                    <p>Drop here to upload...</p>
                                </div>
                                :
                                <>
                                    <input {...getInputProps} hidden name="logo" type="file" />
                                    <div className="text-center">
                                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary"></i>
                                        <h4 className="mt-2">Drag and Drop /</h4>
                                        <p>click to upload photos</p>
                                    </div>
                                </>
                        }
                    </div>
                }
                {
                    files && files?.data.length > 0 &&
                    <div className="grid grid-cols-6 gap-3">
                        {
                            files.data.map(file =>
                                <div className="rounded-md overflow-hidden border-2 max-h-50 flex flex-col">
                                    <div className="flex flex-1 overflow-hidden">
                                        <img src={file.path} className="object-contain mx-auto" alt="" />
                                    </div>
                                    <div className="dark:bg-gray-900 bg-gray-200 p-1">
                                        <p className="text-xs">Size: {filesize(file.size)}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }

            </Card>
        </>
    )
}

export default File