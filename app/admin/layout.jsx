import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full">
        <AdminHeader />
        {children}
        </div>
    </div>
  );
}
