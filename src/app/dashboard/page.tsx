import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = async () => {
  return (
    <div>
      <main>
        <div>Logged In</div>
      </main>
    </div>
  );
};

export default withPageAuthRequired(Dashboard);
