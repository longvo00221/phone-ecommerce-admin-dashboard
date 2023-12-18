"use client";
import privateClient from "@/api/config/private.client";
import publicClient from "@/api/config/public.client";
import Overview from "@/components/Overview";
import Heading from "@/components/ui/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { priceFormat } from "@/lib/utils";
import { CreditCard, Package } from "lucide-react";
import { useEffect, useState } from "react";
const DashboardPage = () => {
  const [orders, setOrders] = useState<any>();
  const [userList, setUserList] = useState<any>();
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const OrderData = await privateClient("order/order-list");

      const UserData = await privateClient("user/get-user-list");
      const ProductData = await publicClient("product/product-list");
      setOrders(OrderData?.data?.content);
      setUserList(UserData?.data?.content);
      setProducts(ProductData?.data?.content);
    };
    fetchData();
  }, []);
  if(!orders && !userList && !products) return
  const totalRevenue = orders?.reduce((acc:number, order:any) => acc + order.total, 0);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
          
            </CardHeader>
            <CardContent>
              <p className="text-sm lg:text-2xl font-bold">{priceFormat.format(totalRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of orders
              </CardTitle>
              <CreditCard className="text-muted-foreground w-4 h-4" />
            </CardHeader>
            <CardContent>
              <p className="text-sm lg:text-2xl font-bold">{orders?.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In stock
              </CardTitle>
              <Package className="text-muted-foreground w-4 h-4" />
            </CardHeader>
            <CardContent>
              <p className="text-sm lg:text-2xl font-bold">{products?.length}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Overview data={orders} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
