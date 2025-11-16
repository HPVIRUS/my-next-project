"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const client = await clerkClient();
  
  const response = await client.users.getUserList({ limit: 100 });
  const users = response.data;

  // فقط داده‌های ساده برگردون
  return users.map(user => ({
    id: user.id,
    fullName: user.firstName + " " + (user.lastName || ""),
    email: user.emailAddresses[0]?.emailAddress || "",
    role: user.privateMetadata?.isAdmin ? "admin" : "user",
        isOwner: user.privateMetadata?.isOwner || false,
  }));
}
export async function UpdataRoleUser(id:string,makeAdmin:boolean) {
 const client = await clerkClient();

  const updatedUser = await client.users.updateUser(id, {
    privateMetadata: { isAdmin: makeAdmin },
  });

  revalidatePath("dashboard/users");

  return {
    id: updatedUser.id,
    fullName: updatedUser.firstName + " " + (updatedUser.lastName || ""),
    email: updatedUser.emailAddresses[0]?.emailAddress || "",
    role: updatedUser.privateMetadata?.isAdmin ? "admin" : "user",
    isOwner: updatedUser.privateMetadata?.isOwner || false,
  };
}
