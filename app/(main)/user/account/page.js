"use client";

import Banner from "@/components/banners/banner";
import { userRoutes } from "@/components/privateRoute";
import { UserStore } from "@/hooks/user-store"
import { useEffect, useState } from "react";

import axios from "axios";
import SpinLoading from "@/components/spinLoading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal";

function UserAccount() {

    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = UserStore();
    const { onOpen } = useModal();

    useEffect(() => {
        loadCurrentUser();
    }, [user]);

    const loadCurrentUser = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/currentUser', { email: user?.email });
            setCurrentUser(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    return loading ?
        <SpinLoading /> :
        <div className="flex flex-col h-[92vh] items-center justify-center">
            <div className="flex flex-col items-center md:flex-row md:gap-x-4 gap-y-4 border-2 border-zinc-500 dark:border-x-zinc-400 py-4 px-8 ">
                <Image
                    src={currentUser?.profilePic}
                    alt="User Profile Pic"
                    width={250}
                    height={250}
                    className="rounded-full"
                />
                <div className="md:h-[245px] md:w-1 bg-zinc-500 md:mx-2" />
                <div className="flex flex-col items-center md:items-start justify-center">
                    <h3 className="text-zinc-500 dark:text-zinc-400 font-semibold text-2xl">Your Details</h3>
                    <Separator className="my-2 bg-zinc-500 dark:bg-zinc-400" />
                    <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">Email - {currentUser?.email}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1"> Display Name - {currentUser?.name}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">Subscribers - {currentUser?.subscribers}</p>
                    <p className="text-zinc-500 dark:text-zinc-400 font-semibold p-2 rounded-md my-1">Joined - {new Date(currentUser?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <Button onClick={() => onOpen("userUpdate")} variant="outline" className="mt-4">Update Profile</Button>
        </div>
}

export default userRoutes(UserAccount);