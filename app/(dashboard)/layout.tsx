"use client";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isUser, setIsUser] = useState<any>(false);
  useEffect(() => {
    // Check if we're running on the client side (browser)
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        if(userData.role){
          setIsUser(true)
        }
      }
   

    }
  }, [router]);

  return (
  <>
    <Navbar/>
    {isUser && children}
  </>);
}
