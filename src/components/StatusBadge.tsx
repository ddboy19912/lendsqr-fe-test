import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/User";

export const StatusBadge = ({ status }: { status: User["meta"]["status"] }) => {
  const statusConfigs = {
    active: { label: "Active", className: "active-status" },
    inactive: { label: "Inactive", className: "inactive-status" },
    pending: { label: "Pending", className: "pending-status" },
    blacklisted: { label: "Blacklisted", className: "blacklisted-status" },
  } as const;

  return (
    <Badge className={statusConfigs[status]?.className}>
      {statusConfigs[status]?.label}
    </Badge>
  );
};
