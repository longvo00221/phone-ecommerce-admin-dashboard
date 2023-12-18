"use client";
import privateClient from "@/api/config/private.client";
import publicClient from "@/api/config/public.client";
import ProductForm from "@/components/ProductForm";

import React, { useEffect, useState } from "react";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<any>();
  const [color, setColors] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [brands,setBrands] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.productId && !isNaN(parseInt(params.productId))) {
          const productData = await publicClient.get(
            `product/find-product/${params.productId}`
          );
          setProduct(productData.data.content);
        }
        const color = await privateClient.get("color/color-list");
        const category = await privateClient.get("category/category-list");
        const brand = await privateClient.get("brand/brand-list")

        setBrands(brand.data.content)
        setCategories(category.data.content);
        setColors(color.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.productId]);


  const storage = [
    {
      name: "64GB",
    },
    {
      name: "128GB",
    },
    {
      name: "256GB",
    },
    {
      name: "512GB",
    },
  ];
  if(!brands && !color && !categories) return
  return (
    <div className="flex-col">
      <div className="space-y-4 flex-1 p-8">
        <ProductForm
          initialData={product}
          brand={brands}
          categories={categories}
          color={color}
          storage={storage}
        />
      </div>
    </div>
  );
};

export default ProductPage;
