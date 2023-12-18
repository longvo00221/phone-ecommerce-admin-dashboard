'use client'
import privateClient from '@/api/config/private.client';
import ColorClient from '@/components/color/ColorClient';
import { ColorColumn } from '@/components/color/Columns';
import { useEffect, useState } from 'react';

const ColorPage =  () => {
    const [colors, setColors] = useState<any>();
  useEffect(() => {
    const fetchDataFromColorApi = async () => {

      const res = await privateClient.get(
        "color/color-list"
      );
      setColors(res.data.content);
    };
    fetchDataFromColorApi()
  }, []);
  
    if(!colors) return
    const formattedColors: ColorColumn[] = colors.map((color:any) => ({
        id:color.id_color,
        name: color.name,
        hex: color.hex
    }))

    return (
        <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ColorClient data={formattedColors} />
        </div>
    </div>
    )
}
export default ColorPage;