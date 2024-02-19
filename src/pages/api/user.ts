import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "@auth0/nextjs-auth0/src/session";

// @ts-ignore
export default withApiAuthRequired(
  async (req: NextRequest, res: NextResponse): Promise<any> => {
    const session: Session | null | undefined = await getSession(req, res);
    const user = session?.user || null;
    // the getSession function is used to get the session object that's created in the app. Which is where auth data is kepy
    await res.json({ user });
  },
);
