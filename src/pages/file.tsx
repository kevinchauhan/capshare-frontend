import SubHeader from "@/components/custom/subHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createFile, getEvent, getFiles } from "@/http/api"
import { useEventStore } from "@/store"
import { EventData, FileDetails } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { EmptyObject } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { partial } from "filesize"
import { Skeleton } from "@/components/ui/skeleton"
const filesize = partial({ standard: "jedec" })

const uploadImage = async (files: File[], eventId: string) => {
    try {
        const formData = new FormData()
        files.forEach(file => {
            formData.append('logo', file)
        })
        const response = await createFile(eventId, formData)
        return response
        console.log('Image uploaded successfully:', response.data)
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const fetchFiles = async (id: string) => {
    const { data } = await getFiles(id)
    return data
}
const fetchEvent = async (id: string) => {
    const { data } = await getEvent(id)
    return data
}

const File = () => {
    const [eventData, setEventData] = useState<EventData | EmptyObject>({})
    const { events } = useEventStore()
    const { id } = useParams()
    const [skeletonCount] = useState([1, 2, 3, 4, 5, 6])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data: files, isPending, refetch: filesRefetch } = useQuery<FileDetails>({
        queryKey: ['files'],
        queryFn: () => fetchFiles(id!)
    })

    const { data: event, refetch } = useQuery<EventData>({
        queryKey: ['event'],
        queryFn: () => fetchEvent(id!),
        enabled: true
    })

    useEffect(() => {
        if (events) {
            const currentEvent = events.filter(event => event._id === id)
            setEventData(currentEvent[0])
        }
    }, [events, id])

    useEffect(() => {
        if (!events && !event) {
            refetch()
        } else {
            if (event) {
                setEventData(event)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event, setEventData])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do something with the files
        await uploadImage(acceptedFiles, id!)
        filesRefetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            await uploadImage(Array.from(files), id!)
            filesRefetch()
        } else {
            alert('Please select file(s) to upload.')
        }
    }

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
                <input type="file" hidden={true} ref={fileInputRef} onChange={handleFileInputChange} />
                <Button variant="outline" onClick={handleButtonClick}>Add</Button>
            </SubHeader>

            <Card className='mt-5 flex-1 p-5'>
                {isPending &&
                    <div className="grid md:grid-cols-6 gap-3 pt-5">
                        {
                            skeletonCount.map((e) =>
                                <div key={e} className="flex flex-col mt-5">
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
                                <div key={file._id} className="rounded-md overflow-hidden border-2 max-h-50 flex flex-col">
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