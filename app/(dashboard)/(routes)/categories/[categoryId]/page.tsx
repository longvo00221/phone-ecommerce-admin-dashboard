"use client";
import privateClient from "@/api/config/private.client";
import CategoryForm from "@/components/CategoryForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    const handleFetchingCategoriesFromApi = async () => {
      if (params.categoryId && !isNaN(parseInt(params.categoryId))) {
        const res = await privateClient.get(
          `category/find-category/${params.categoryId}`
        );
        setCategories(res.data.content);
      }
    };
    handleFetchingCategoriesFromApi();
  }, [params.categoryId]);

  return (
    <div className="flex-col">
      <div className="space-y-4 flex-1 p-8">
        <CategoryForm initialData={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
