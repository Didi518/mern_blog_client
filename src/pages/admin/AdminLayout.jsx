import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../../services/index/users";
import Header from "./components/header/Header";

const AdminLayout = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onError: (err) => {
      navigate("/");
      toast.error("Permission refusée, réservé aux admins");
    },
  });

  useEffect(() => {
    if (profileData) {
      if (!profileData.admin) {
        navigate("/");
        toast.error("Permission refusée, réservé aux admins");
      }
    }
  });

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Chargement...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
