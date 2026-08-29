import { getUserInfo } from "@/api/http"
import { useQuery } from "@tanstack/react-query"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo,
        retry: false
    })


    if(isPending){
        return <div className="bg-black h-screen w-screen">Loading.....</div>
    }

    if(!data || isError){
        console.log(data)
        return <Navigate to="/signup" replace />;
    }
    console.log({ data, isPending, isError, error });
    return <Outlet />
}

export default ProtectedRoute