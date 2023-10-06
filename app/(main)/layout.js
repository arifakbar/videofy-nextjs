"use client";

import SideNavbar from "@/components/sideNav/side-navbar";
import TopNavbar from "@/components/topnav/top-navbar";

import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { UserStore } from "@/hooks/user-store";

import axios from "axios";

export default function MainLayout({ children }) {

  const { loggedInUser } = UserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const dbUser = await axios.post('/api/currentUser', { email: user.email });
        loggedInUser(idTokenResult, dbUser);
      }
    });
    return () => setTimeout(() => {
      unsubscribe();
    }, 3000);
  }, [auth]);

  return (
    <html lang="en">
      <body className="h-full">
        <div className="flex w-full h-[65px] z-30 flex-row fixed inset-x-0">
          <TopNavbar />
        </div>
        <div className="hidden md:flex pt-[65px] h-full w-[72px] md:w-[180px] z-30 flex-col fixed inset-y-0">
          <SideNavbar />
        </div>
        <main className="md:pl-[180px] pt-[65px] h-full">{children}</main>
      </body>
    </html>
  );
}
