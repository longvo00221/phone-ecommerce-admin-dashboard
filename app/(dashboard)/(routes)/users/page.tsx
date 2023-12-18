"use client";
import privateClient from "@/api/config/private.client";
import { UserColumn } from "@/components/users/Columns";
import UserClient from "@/components/users/client";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [userList, setUserList] = useState<Array<Object>>([]);
  useEffect(() => {
    const fetchUserListDataFromApi = async () => {
      try {
        const data = await privateClient.get("user/get-user-list");
        setUserList(data.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserListDataFromApi();
  }, []);
  const formattedUser: UserColumn[] = userList.map((user: any,i:number) => ({
    id: user.id_user,
    stt:i + 1,
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    address: user.address,
    phone: user.phone,
    role: user.role,
  }));

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <UserClient data={formattedUser}/>
        </div>
    </div>
  )
};

export default UsersPage;
