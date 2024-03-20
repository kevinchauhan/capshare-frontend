import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const Signup = () => {
    const formSchema = z.object({
        name: z.string({ required_error: 'Please enter your name' }).trim().min(1, { message: 'Please enter your name' }),
        studioname: z.string({ required_error: 'Please enter your studio name' }).trim().min(1, { message: 'Please enter your studio name' }),
        email: z.string({ required_error: 'Please enter your email' }).email({ message: 'Enter valid email' }),
        password: z.string({ required_error: 'Please enter your password' }).min(8, { message: 'Password must be atleast 8 chars' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            studioname: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className="flex flex-col justify-center min-h-screen items-center">
            <h1 className="text-2xl mb-2 font-medium">CapShare</h1>
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle className="text-center mb-2 text-xl">Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-2">
                            <div className="grid lg:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="studioname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Studio Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your studio name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="text-end">
                                <Link to="/login" className="text-sm hover:underline">Already have an account? Log In</Link>
                            </div>
                            <Button type="submit" >Sign up</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup


