'use client'
import publicClient from '@/api/config/public.client';
import { ProductColumn } from '@/components/products/Columns';
import ProductClient from '@/components/products/client';
import { useEffect, useState } from 'react';


const ProductsPage =  () => {
  const [products, setProducts] = useState<Array<Object>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await publicClient.get('product/product-list');
        setProducts(data.data.content);
      } catch (error) {
    
      }
    };

    fetchData();
  }, []);
 
  const formattedProducts: ProductColumn[] = products.map((product: any) => ({
    id: product.id_product,
    name: product.name,
    price: product.price,
    categories: product.categoryBrandMapping.category.name,
    brand: product.categoryBrandMapping.brand.name,
    color: product.color,
    storage: product.storage,
    original_price: product.original_price,
    quantity: product.quantity,
    screen: product.screen,
    new_release: product.new_release,
    front_camera: product.front_camera,
    rear_camera: product.rear_camera,
    chip:product.chip,
    battery:product.battery,

  }));
  
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default ProductsPage