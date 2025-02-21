"use client";
import * as React from "react";

import { useRouter } from "next/navigation";

import { Header } from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { getToken } from "@/utils/helper";

export default function DashboardLayoutBasic({ children }) {
  const router = useRouter();
  React.useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/");
    }
  }, []);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
 
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="bg-gray-200">
      <div className="flex h-screen overflow-hidden">
        {/* sidbar start  */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header start  */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
