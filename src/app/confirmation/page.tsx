import { ConfirmationComponent } from "@/components/pages/ConfirmationComponent";
import { Card } from "@tremor/react";
import WrapperComponent from "@/components/WrapperComponent";

function Confirmation({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <WrapperComponent>
      <Card className="max-w-md my-4 mx-auto">
        <ConfirmationComponent searchParams={searchParams || {}} />
      </Card>
    </WrapperComponent>
  );
}

export default Confirmation;
