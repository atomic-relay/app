import WrapperComponent from "@/components/WrapperComponent";
import { Card, Text } from "@tremor/react";
async function Page() {
  return (
    <WrapperComponent>
      <Card className="max-w-sm my-4 mx-auto">
        <Text>Welcome Home</Text>
      </Card>
    </WrapperComponent>
  );
}

export default Page;
