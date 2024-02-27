import {
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import UserDetails from "./components/UserDetails";
import SessionDetails from "./components/SessionDetails";
import OrgDetails from "./components/OrgDetails";
import { redirect } from "next/navigation";
import LoginComponent from "@/components/pages/LoginComponent";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <SignedIn>
        <h1>Signed In</h1>
        {user && (
          <>
            <h1 className="text-3xl font-semibold text-black">
              👋 Hi, {user.firstName || `Stranger`}
            </h1>
            <div className="grid gap-4 mt-8 lg:grid-cols-3">
              <UserDetails />
              <SessionDetails />
              <OrgDetails />
            </div>
          </>
        )}
        <UserButton afterSignOutUrl="/login" />
      </SignedIn>
      <SignedOut>
        <h1>Signed Out</h1>
        <LoginComponent />
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Dashboard;
