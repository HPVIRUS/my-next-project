"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminMenuProps {
  userRole: "user" | "admin" | "owner";
}

const AdminMenu = ({ userRole }: AdminMenuProps) => {
  const getRoleBadge = () => {
    switch (userRole) {
      case "owner":
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
            Owner
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
            Admin
          </Badge>
        );
      case "user":
        return (
          <Badge className="bg-gray-300 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
            User
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getRoleBadge()}

      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Dashboard"
            labelIcon={<LayoutDashboard size="sm" />}
            href="/dashboard/products"
          />
          <UserButton.Link
            label="Manage Users"
            labelIcon={<Users size="sm" />}
            href="/dashboard/users"
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default AdminMenu;
