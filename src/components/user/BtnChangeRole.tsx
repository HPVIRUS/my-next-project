"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdataRoleUser } from "@/modules/products/services/clerk";

interface ChangeRoleButtonProps {
  userId: string;
  currentRole: "user" | "admin";
}

export default function ChangeRoleButton({
  userId,
  currentRole,
}: ChangeRoleButtonProps) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const handleChangeRole = async () => {
    setLoading(true);

    try {
      const updated = await UpdataRoleUser(userId, role !== "admin");
      const newRole: "user" | "admin" =
        updated.role === "admin" ? "admin" : "user";
      setRole(newRole);
    } catch (error) {
      console.error("Failed to update role:", error);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleChangeRole}
      disabled={loading}
    >
      {role === "admin" ? "Demote to User" : "Promote to Admin"}
    </Button>
  );
}
