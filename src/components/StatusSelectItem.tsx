import type { StatusConfig } from "@/components/DataTable";
import { SelectItem } from "@/components/ui/select";

export const StatusSelectItem = ({
  value,
  config,
}: {
  value: string;
  config: StatusConfig;
}) => (
  <SelectItem value={value} className="hover:bg-secondary-font-color-06">
    {config.label}
  </SelectItem>
);
