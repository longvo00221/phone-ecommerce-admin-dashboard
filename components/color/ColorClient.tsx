"use client";

import { Plus } from "lucide-react";
import Heading from "../ui/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "../ui/dataTable";
import { ColorColumn, Columns } from "./Columns";

interface ColorProps {
  data: ColorColumn[];
}

const ColorClient = ({ data }: ColorProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Color (${data?.length})`}
          description="Manage color for your billboards"
        />
        <Button
          onClick={() => router.push(`/color/new`)}
        >
          <Plus className="mr-4 w-4 h-4" />
          <span>create</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Columns} data={data} />
      {/* <Heading title="API" description="API calls for color" />
      <Separator /> */}
      {/* <ApiList entityName="color" entityIdName="categoryId" /> */}
    </>
  );
};

export default ColorClient;
