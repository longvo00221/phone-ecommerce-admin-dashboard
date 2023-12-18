"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Edit, MoreHorizontal, ShieldCheck, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "../modals/alertModal";
import privateClient from "@/api/config/private.client";
import {format} from 'date-fns'

export type UserColumn = {
  id: number;
  stt:number;
  name: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
  role: boolean;
};

export const Columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "stt",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
    cell: ({ row }) => format(new Date(row.original.birthday), 'dd/MM/yyyy'),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) =>
      row.original.role ? (
        <div className="flex items-center gap-3">
          <ShieldCheck />
          Admin
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <User/>
          User
          </div>
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

interface ICellAction {
  data: UserColumn;
}

export const CellAction = ({ data }: ICellAction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("User ID copied.");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await privateClient.delete(`user/delete-user/${data.id}`);
      router.push("/users");
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Failed to delete User");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  const IdUser = data.id.toString();
  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-5 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/users/${data.id}`)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onCopy(IdUser)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
