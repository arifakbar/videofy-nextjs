"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { auth } from "@/firebase/firebase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UserStore } from "@/hooks/user-store"
import axios from "axios"

const formSchema = z.object({
    password: z.string().min(6),
})

export default function AuthRegister() {

    const [email, setEmail] = useState("");
    const { loggedInUser } = UserStore();

    const router = useRouter();

    useEffect(() => {
        setEmail(window?.localStorage?.getItem("emailForRegistration"))
    }, [email]);


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values) => {
        try {
            const res = await auth.signInWithEmailLink(email, window.location.href);
            if (res.user.emailVerified) {
                window?.localStorage?.removeItem("emailForRegistration")
                let user = auth.currentUser;
                user = await user.updatePassword(values.password);
                const idTokenResult = await user.getIdTokenResult();
                const dbUser = await axios.post('/api/users', user);
                loggedInUser(idTokenResult, dbUser);
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="h-[100vh] flex flex-1 items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Set Password</CardTitle>
                    <CardDescription>Complete your registration here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Email</Label>
                                    <Input disabled id="name" value={email} />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-zonc-500 dark:text-secondary/70">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-zinc-300/50 dark:border dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                    disabled={isLoading}
                                                    type="password"
                                                    placeholder="Enter you password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-4">
                                <Button disabled={isLoading}>Register</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}