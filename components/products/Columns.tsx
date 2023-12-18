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
import { priceFormat } from "@/lib/utils";
export type ProductColumn = {
  id: number;
  stt:number;
  name: string;
  price: number;
  original_price: number; 
  chip: string;
  battery: string;
  brand: string; 
  categories: string; 
  quantity: string;
  new_release: string;
};


export const Columns: ColumnDef<ProductColumn>[] = [
    {
      accessorKey: "stt",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => priceFormat.format(row.original.price),
    },
    {
      accessorKey: "original_price",
      header: "Original Price",
      cell: ({ row }) => priceFormat.format(row.original.original_price),
    },
    {
      accessorKey: "chip",
      header: "Chip",
    },
    {
      accessorKey: "battery",
      header: "Battery",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "categories",
      header: "Category",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "new_release",
      header: "New Release",
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];

interface ICellAction {
    data: ProductColumn


}

export const CellAction = ({data}: ICellAction)=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const onCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Product ID copied.");
    }

    const onDelete = async () => {
        try {
          setIsLoading(true);
          await privateClient.delete(`/product/delete-product/${data.id}`);
          window.location.reload()
          toast.success("product deleted!");
        } catch (error) {
          toast.error("Failed to delete product");
        } finally {
          setIsLoading(false);
          setIsOpen(false);
        }
      };
      const IdProduct = data.id.toString()
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
                <DropdownMenuItem onClick={()=>router.push(`/products/${data.id}`)} className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={()=>onCopy(IdProduct)}>
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