import SubHeader from "@/components/custom/subHeader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createFile } from "@/http/api"
import { useEventStore } from "@/store"
import { EventData } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { EmptyObject } from "react-hook-form"
import { useParams } from "react-router-dom"

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

const File = () => {
    const [open, setOpen] = useState(false)
    const [eventData, setEventData] = useState<EventData | EmptyObject>({})
    const { events } = useEventStore()
    const { id } = useParams()

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
                                    <i className="fa-solid fa-cloud-arrow-up text-5xl"></i>
                                    <h4 className="mt-2">Drag and Drop /</h4>
                                    <p>click to upload photos</p>
                                </div>
                            </>
                    }
                </div>
            </Card>
        </>
    )
}

export default File