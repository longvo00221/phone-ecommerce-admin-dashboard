'use client'
import privateClient from '@/api/config/private.client';
import CategoryClient from '@/components/categories/CategoryClient';
import { CategoryColumn } from '@/components/categories/Columns';
import axios from 'axios';
import { useEffect, useState } from 'react';


const CategoriesPage =  () => {
  const [categories,setCategories] = useState<any>()
  useEffect(()=> {
    const handleFetchingCategoriesFromApi = async () => {

      const res = await privateClient.get("category/category-list")
      setCategories(res.data.content)
    }
    handleFetchingCategoriesFromApi()
  },[])
  if(!categories) return
  const formattedCategories: CategoryColumn[] = categories.map((category:any) =>({
    id: category.id_category,
    name: category.name,
  }))
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryClient data={formattedCategories} />
        </div>
    </div>
  )
}

export default CategoriesPage;