
import { StorageColumn } from '@/components/storage/Columns';
import StorageClient from '@/components/storage/client';


const StoragePage = async () => {
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
    const formattedColors: StorageColumn[] = Storage.map((storage) => ({
        id: storage.id,
        name: storage.name,
     
    }))
    return (
        <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <StorageClient data={formattedColors} />
        </div>
    </div>
    )
}
export default StoragePage;