import { Card } from "@tremor/react";
import WrapperComponent from "@/components/WrapperComponent";
import LoginComponent from "@/components/pages/LoginComponent";

function Login() {
  return (
    <WrapperComponent>
      <Card className="max-w-md my-40 mx-auto">
        <h1> Sign in </h1>
        <LoginComponent />
      </Card>
    </WrapperComponent>
  );
}

export default Login;
