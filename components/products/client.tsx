"use client";

import { Plus } from "lucide-react";
import Heading from "../ui/Heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Columns, ProductColumn } from "./Columns";
import { DataTable } from "../ui/dataTable";


interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Heading
          title={`Products (${data?.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/products/new`)}>
          <Plus className="mr-4 w-4 h-4" />
          <span>create</span>
        </Button>
      </div>
      <div className="w-full">
        <Separator />
        <DataTable searchKey="name" columns={Columns} data={data} />
      </div>
    </>
  );
};

export default ProductClient;
