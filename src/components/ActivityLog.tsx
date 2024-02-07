import { Card } from "@/components/ui/card";
import { useSharedState } from "@/providers/SharedStateProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Activity log displaying information to help understand what's happening behind the scenes.
 */
const ActivityLog = () => {
  const { activityLogs } = useSharedState();

  // @ts-ignore
  let activityLogRows = activityLogs.map((activityLog) => {
    return (
      <TableRow
        key={`${activityLog.timestamp.toISOString()} ${activityLog.event} ${activityLog.status}`}
      >
        <TableCell>{activityLog.timestamp.toLocaleString()}</TableCell>
        <TableCell>{activityLog.event}</TableCell>
        <TableCell className="text-right">{activityLog.status}</TableCell>
      </TableRow>
    );
  });

  return (
    <Card className="w-full min-h-[200px] max-h-[560px] overflow-scroll">
      <Table>
        <TableHeader className="sticky top-0 bg-white">
          <TableRow>
            <TableHead className="w-[200px]">Timestamp</TableHead>
            <TableHead>Event</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{activityLogRows}</TableBody>
      </Table>
      {activityLogRows.length === 0 && <EmptyActivityLog />}
    </Card>
  );
};

const EmptyActivityLog = () => {
  return (
    <div className="grid place-content-center h-[150px] text-center">
      <div className="text-lg font-semibold">Nothing to report, captain</div>
      <p className="text-sm text-muted-foreground">
        See what’s happening behind the demo.
      </p>
    </div>
  );
};

export default ActivityLog;
