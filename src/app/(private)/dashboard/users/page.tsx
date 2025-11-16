// page.tsx (Server Component)
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UsersTableClient from "@/components/user/UsersTableClient";
import { getUsers } from "@/modules/products/services/clerk";

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTableClient users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
