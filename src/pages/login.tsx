import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const Login = () => {
    type formValues = {
        email: string
        password: string
    }

    const [error, setError] = useState('')

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: formValues) => {
        if (values.email === '' || values.password === '') {
            setError('Enter your credentials')
        }
        console.log(values)
    }

    return (
        <div className="flex flex-col justify-center min-h-screen items-center">
            <h1 className="text-2xl mb-2 font-medium">CapShare</h1>
            <Card className="md:w-1/3">
                <CardHeader>
                    <CardTitle className="text-center mb-2 text-xl">Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-2">
                            <div className="grid lg:grid-cols-1 gap-3">
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
                                            <FormMessage >{error}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:text-end">
                                <Link to="/login" className="text-xs md:text-sm hover:underline">Already have an account? Log In</Link>
                            </div>
                            <div className="md:text-start text-center">
                                <Button type="submit" >Login</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login


