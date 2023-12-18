"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton from "./ui/IconButton";
const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const routes = [
    {
      href: `/`,
      label: "Overview",
      active: pathname === `/`,
    },
    {
      href: `/brand`,
      label: "Brand",
      active: pathname === `/brand`,
    },
    {
      href: `/categories`,
      label: "Categories",
      active: pathname === `/categories`,
    },
    {
      href: `/products`,
      label: "Products",
      active: pathname === `/products`,
    },
    {
      href: `/color`,
      label: "Color",
      active: pathname === `/color`,
    },
    // {
    //   href: `/storage`,
    //   label: "Storage",
    //   active: pathname === `/storage`,
    // },
    {
      href: `/users`,
      label: "Users",
      active: pathname === `/users`,
    },
    {
      href: `/orders`,
      label: "Order",
      active: pathname === `/orders`,
    },
  ];
  const router = useRouter();
  const handleSignOut = () => {
    if (typeof window !== "undefined") {

      localStorage.removeItem("user");
    }
    router.push("/sign-in");
  };
  return (
    <>
      <nav className={cn("space-x-4", className)}>
        <div
          className={cn("hidden lg:flex items-center space-x-4 lg:space-x-6")}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="mx-auto flex justify-center items-center space-x-4">
            <Button onClick={() => handleSignOut()} >
              <LogOut size={15}/>
            </Button>
          </div>
        </div>
        <div className="lg:hidden">
          <Button className="lg:hidden bg-white" onClick={onOpen}>
            <Menu size={25} color="black" />
          </Button>
          <Dialog
            onClose={onClose}
            open={isOpen}
            as="div"
            className="relative z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="flex fixed inset-0">
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto shadow-xl bg-white py-6 pb-4">
                <div className="flex items-center justify-end px-4">
                  <IconButton icon={<X size={20} />} onClick={onClose} />
                </div>
               
                <div className="flex flex-col w-full space-y-3 mt-10 items-center">
                  {routes.map((route) => (
                    <Link
                      onClick={onClose}
                      key={route.href}
                      href={route.href}
                      className={cn(
                        " font-medium text-xl transition-colors hover:text-primary",
                        route.active
                          ? "text-black dark:text-white"
                          : "text-muted-foreground"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
