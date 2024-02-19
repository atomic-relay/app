import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired();

const Dashboard = async () => {
  const { user } = (await getSession().user) || null;
  return (
    <div>
      <main>
        {user && (
          <div>
            <div>
              {user.email}{" "}
              {!user.email_verified && (
                <span>Your account is not verified</span>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
