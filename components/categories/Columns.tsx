"use client"

import {ColumnDef} from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "../modals/alertModal";
import privateClient from "@/api/config/private.client";

export type CategoryColumn = {
    id: number;
    name: string;

}

export const Columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
  

    {
        id: 'actions',
        cell: ({row})=> <CellAction data={row.original} />
    }
    
] 

interface ICellAction {
    data: CategoryColumn;
}

export const CellAction = ({data}: ICellAction)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const onCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Category ID copied to clipboard.");
    }

    const onDelete = async () => {
        try {
          setIsLoading(true);
          await privateClient.delete(`category/delete-category/${data.id}`);
          router.refresh();
          toast.success("category deleted!");
        } catch (error) {
          toast.error("You can't delete category containing products");
        } finally {
          setIsLoading(false);
          setIsOpen(false);
        }
      };
      const IdCategory = data?.id?.toString()
    return (
        <>
        <AlertModal isLoading={isLoading} isOpen={isOpen} onClose={()=>setIsOpen(false)} onConfirm={onDelete}/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"  className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-5 w-5 "/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>router.push(`categories/${data.id}`)} className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={()=>onCopy(IdCategory)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setIsOpen(true)} className="cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}