"use client";

import { Plus } from "lucide-react";
import Heading from "../ui/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../ui/dataTable";
import { StorageColumn, Columns } from "./Columns";

interface StorageProps {
  data: StorageColumn[];
}

const StorageClient = ({ data }: StorageProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Storage (${data?.length})`}
          description="Manage Storage for your billboards"
        />
        <Button
          onClick={() => router.push(`/storage/new`)}
        >
          <Plus className="mr-4 w-4 h-4" />
          <span>create</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
      {/* <Heading title="API" description="API calls for Storage" />
      <Separator /> */}
      {/* <ApiList entityName="Storage" entityIdName="categoryId" /> */}
    </>
  );
};

export default StorageClient;
