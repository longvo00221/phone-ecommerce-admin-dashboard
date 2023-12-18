
import StorageForm from '@/components/StorageForm';
import React from 'react'

const StoragePage = async ({params}: {params: {categoryId: string, storeId: string}}) => {
  
    const Storage = [
        {
            id:"1",
            name:"64 GB",
            
        },
        {
            id:"2",
            name:"128 GB",
            
        },
        {
            id:"3",
            name:"254 GB",
            
        },
        {
            id:"4",
            name:"512 GB",
            
        },
    ]

  return (
    <div className='flex-col'>
      <div className="space-y-4 flex-1 p-8">
        <StorageForm initialData={Storage} />
      </div>
    </div>
  )
}

export default StoragePage;