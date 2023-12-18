'use client'
import privateClient from "@/api/config/private.client"

import { useEffect,useState } from "react"
import UserForm from "@/components/UserForm"

const UserPage = ({params}:{params:{userId:string}}) => {
    const [userDetail,setUserDetail] = useState<any>()
    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                if(params.userId && !isNaN(parseInt(params.userId))){
                    const userData = await privateClient.get(`user/find-user/${params.userId}`)
                    setUserDetail(userData.data.content)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchUserData()
    },[params.userId])
    if(!userDetail) return
    return (
        <div className="flex-col">
            <div className="space-y-4 flex-1 p-8">
                <UserForm initialData={userDetail}/>
            </div>
        </div>
    )
}
export default UserPage