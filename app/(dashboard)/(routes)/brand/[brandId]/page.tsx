"use client";
import privateClient from "@/api/config/private.client";
import BrandForm from "@/components/BrandForm";
import React, { useEffect, useState } from "react";

const BrandPage = ({ params }: { params: { brandId: string } }) => {
  const [brand, setBrand] = useState<any>();
  useEffect(() => {
    const handleFetchBrandDetailApi = async () => {
      if (params.brandId && !isNaN(parseInt(params.brandId))) {
        const res = await privateClient.get(
          `brand/find-brand/${params.brandId}`
        );
        setBrand(res.data.content);
      }
    };
    handleFetchBrandDetailApi();
  }, [params.brandId]);

  return (
    <div className="flex-col">
      <div className="space-y-4 flex-1 p-8">
        <BrandForm initialData={brand} />
      </div>
    </div>
  );
};

export default BrandPage;
