import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import AdminMenu from "./AdminMenu";

async function Auth() {
  const user = await currentUser();
  let role: "owner" | "admin" | "user" = "user";

  if (user?.privateMetadata?.isOwner) {
    role = "owner";
  } else if (user?.privateMetadata?.isAdmin) {
    role = "admin";
  }

  return (
    <div>
      <SignedIn>
        {role === "user" ? <UserButton /> : <AdminMenu userRole={role} />}
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default Auth;
