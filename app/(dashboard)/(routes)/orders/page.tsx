'use client'
import privateClient from "@/api/config/private.client";
import { OrderColumn } from "@/components/orders/Columns";
import OrderClient from "@/components/orders/client";
import { priceFormat } from "@/lib/utils";

import { useEffect, useState } from "react";
const OrdersPage = () => {
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const response = await privateClient.get(
          "order/order-list"
        );

        setOrders(response.data.content);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders()

  }, []);

  // Return loading state if orders are not yet fetched
  if (!orders) return
  const formattedOrders: OrderColumn[] = orders.map((order: any,i:number) => ({
    id: order.id_order,
    stt:i + 1,
    phone: order.phone,
    address: order.address,
    payment_method: order.payment_method,
    delivery_by:order.delivery_by,
    products: order.OrderItem.map((orderItem: any) => orderItem.product.name),
    total: priceFormat.format(order.total),
    created_date:order.created_date
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
