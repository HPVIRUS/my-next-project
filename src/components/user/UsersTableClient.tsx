// UsersTableClient.tsx (Client Component)
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  Button,
  Badge,
} from "@/components/ui/";
import ChangeRoleButton from "@/components/user/BtnChangeRole";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isOwner: true | false;
}

interface UsersTableClientProps {
  users: User[];
}

export default function UsersTableClient({ users }: UsersTableClientProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex justify-between items-center space-x-2 mb-4">
        <Input
          placeholder="Search users..."
          className="w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex space-x-2">
          {(["all", "admin", "user"] as const).map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "outline"}
              size="sm"
              onClick={() => setRoleFilter(role)}
            >
              {role === "all"
                ? "All"
                : role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isOwner ? (
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white"
                  >
                    Owner
                  </Badge>
                ) : user.role === "admin" ? (
                  <Badge variant="default" className="bg-blue-600">
                    admin
                  </Badge>
                ) : (
                  <Badge variant="secondary">user</Badge>
                )}
              </TableCell>
              <TableCell>
                {user.isOwner ? (
                  <Badge variant="destructive" className="bg-red-600">
                    Owner
                  </Badge>
                ) : (
                  <ChangeRoleButton userId={user.id} currentRole={user.role} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
