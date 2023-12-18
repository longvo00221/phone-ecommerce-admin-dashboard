'use client'
import privateClient from '@/api/config/private.client';
import ColorForm from '@/components/ColorForm';

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ColorPage =  ({params}: {params: {colorId: string}}) => {
  
    const [color,setColor] = useState<any>()
    useEffect(()=> {
      const fetchColorDetailApi = async () => {
        if (params.colorId && !isNaN(parseInt(params.colorId))) {

          const res = await privateClient.get(`color/find-color/${params.colorId}`)
  
          setColor(res.data.content)
        }
      }
      fetchColorDetailApi()
    },[params.colorId])
  
  return (
    <div className='flex-col'>
      <div className="space-y-4 flex-1 p-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage;