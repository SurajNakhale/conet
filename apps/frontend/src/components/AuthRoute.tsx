import { getUserInfo } from "@/api/http";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    retry: false,
  });

  if (isPending) {
    return <div className="bg-black h-screen w-screen">Loading...</div>;
  }

  if (!isError && data) {
    return <Navigate to="/rooms" replace />;
  }

  return <Outlet />;
};


export default AuthRoute;