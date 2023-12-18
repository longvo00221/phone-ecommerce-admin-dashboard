'use client'
import { BrandColumn } from "@/components/brand/Columns";
import BrandClient from "@/components/brand/BrandClient";
import { useEffect, useState } from "react";

import privateClient from "@/api/config/private.client";
const BrandPage =  () => {
  const [brands,setBrands] = useState<any>()

  useEffect(()=>{
    const handleFetchBrandApi = async () => {
      const res = await privateClient.get("brand/brand-list")
      
      setBrands(res.data.content)
    }
    handleFetchBrandApi()
  },[])
  
  if(!brands) return
  const formattedBrand: BrandColumn[] = brands.map((brand:any) => ({
    id: brand.id_brand,
    name: brand.name,
    banner: brand.img,

  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandClient data={formattedBrand} />
      </div>
    </div>
  );
};

export default BrandPage