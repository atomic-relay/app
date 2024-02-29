import {
  currentUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import UserDetails from "./components/UserDetails";
import SessionDetails from "./components/SessionDetails";
import OrgDetails from "./components/OrgDetails";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@tremor/react";
const Dashboard = async () => {
  const user = await currentUser();

  // if (!user) {
  //   redirect("/login");
  // }

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
              <h1>Welcome {user.firstName || `Stranger`}</h1>
              <UserDetails />
              <SessionDetails />
              <OrgDetails />
              <SignOutButton />
            </div>
          </>
        )}
        <UserButton afterSignOutUrl="/login" />
      </SignedIn>
      <SignedOut>
        <h1>Signed Out</h1>
        <p>Please sign in to continue</p>
        <Button>
          <Link href="/login">Sign in</Link>
        </Button>
        <iframe
          src="https://giphy.com/embed/3ohs7HdhQA4ffttvrO"
          width="480"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
        <p></p>
      </SignedOut>
    </div>
  );
};

export default Dashboard;
