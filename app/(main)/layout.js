"use client";

import SideNavbar from "@/components/sideNav/side-navbar";
import TopNavbar from "@/components/topnav/top-navbar";

function MainLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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

export default MainLayout;
