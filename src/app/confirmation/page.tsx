import { ConfirmationComponent } from "@/components/pages/ConfirmationComponent";
import { Card } from "@tremor/react";
export default function Confirmation({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Card className="max-w-md my-4 mx-auto">
      <ConfirmationComponent searchParams={searchParams || {}} />
    </Card>
  );
}
