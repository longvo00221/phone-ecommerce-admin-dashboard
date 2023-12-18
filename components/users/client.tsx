"use client";

import Heading from "../ui/Heading";

import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Columns, UserColumn } from "./Columns";
import { DataTable } from "../ui/dataTable";


interface UserClientProps {
  data: UserColumn[];
}

const UserClient = ({ data }: UserClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Users (${data?.length})`}
          description="Manage Users for your store"
        />
        {/* <Button onClick={() => router.push(`/products/new`)}>
          <Plus className="mr-4 w-4 h-4" />
          <span>create</span>
        </Button> */}
      </div>
      <div className="w-full">
        <Separator />
        <DataTable searchKey="name" columns={Columns} data={data} />
      </div>
    </>
  );
};

export default UserClient;
