'use client'
import { Plus } from 'lucide-react'
import Heading from '../ui/Heading'
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BrandColumn, Columns } from "./Columns";
import { DataTable } from "../ui/dataTable";

interface BrandClientProps {
    data:BrandColumn[]
}

const BrandClient = ({data}:BrandClientProps) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
          <div className="flex flex-row items-center justify-between">
            <Heading
              title={`Brand (${data?.length})`}
              description="Manage brand for your store"
            />
            <Button
              className="text-sm w-fit"
              onClick={() => router.push(`/brand/new`)}
            >
              <Plus className="mr-2 w-4 h-4" />
              <span className="text-lg">create</span>
            </Button>
          </div>
          <Separator />
          <DataTable searchKey="label" columns={Columns} data={data} />
          {/* <Heading title="API" description="API calls for billboards" />
          <Separator /> */}
          {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
        </>
      );
}
export default BrandClient