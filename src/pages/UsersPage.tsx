import {
  DeleteUserIcon,
  LoanIllustration,
  PeopleIllustration,
  SavingsIllustration,
  UserIcon,
  UsersIllustration,
} from "@/assets";
import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import Icon from "@/components/Icon";
import { StatusBadge } from "@/components/StatusBadge";
import { useAllUsers } from "@/hooks/useUsers";
import { useUserStatus } from "@/hooks/useUserStatus";
import { formatAmount, formatPhoneNumber } from "@/lib/helpers";
import { User, UserStatus } from "@/types/User";
import { ColumnDef, Row, type CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const { data: allUsers, isLoading, refetch } = useAllUsers();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  });

  const { mutate } = useUserStatus();

  const handleStatusChange = (userId: string, currentStatus: UserStatus) => {
    mutate(
      { userId, status: currentStatus },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const userStats = useMemo(
    () => ({
      total: allUsers?.length || 0,
      loans:
        allUsers?.filter((user: User) => user.meta.loanAmount > 0).length || 0,
      savings:
        allUsers?.filter((user: User) => user.meta.savingsAmount > 0).length ||
        0,
    }),
    [allUsers]
  );

  const columns = useMemo(
    () => [
      {
        header: "Organization",
        accessorKey: "organization",
        size: 180,
      },
      {
        id: "username",
        accessorFn: (row: User) =>
          `${row.personalInfo.firstName} ${row.personalInfo.lastName}`,
        header: "Username",
        size: 150,
        meta: { type: "text" },
        cell: ({ row }: CellContext<User, unknown>) => {
          const firstName = row.original.personalInfo.firstName;
          const lastName = row.original.personalInfo.lastName;
          return `${firstName} ${lastName}`;
        },
      },
      {
        id: "email",
        header: "Email",
        accessorKey: "meta.email",
        meta: { type: "text" },
        size: 180,
        cell: ({ row }: CellContext<User, unknown>) => row.original.meta.email,
      },
      {
        header: "Phone Number",
        accessorKey: "meta.phone",
        size: 160,
        cell: ({ row }: CellContext<User, unknown>) =>
          formatPhoneNumber(row.original.meta.phone),
      },
      {
        header: "Date Joined",
        accessorKey: "meta.joined",
        size: 150,
        cell: ({ row }: CellContext<User, unknown>) =>
          format(new Date(row.original.meta.joined), "MMM dd, yyyy hh:mm a"),
        meta: { type: "date" },
      },
      {
        id: "status",
        accessorFn: (row: User) => row.meta.status,
        header: "Status",
        size: 120,
        minWidth: 100,
        meta: { type: "status" },
        cell: StatusCell,
        filterFn: (
          row: Row<User>,
          columnId: string,
          filterValue: unknown
        ): boolean => {
          const status = row.getValue<string>(columnId)?.toLowerCase();
          if (typeof filterValue !== "string") return true;
          return filterValue === "all"
            ? true
            : status === filterValue.toLowerCase();
        },
      } as ColumnDef<User>,
    ],
    []
  );

  const statusConfigs = {
    active: {
      label: "Active",
      className: "active-status",
      variant: "default" as const,
    },
    inactive: {
      label: "Inactive",
      className: "inactive-status",
      variant: "secondary" as const,
    },
    pending: {
      label: "Pending",
      className: "pending-status",
      variant: "outline" as const,
    },
    blacklisted: {
      label: "Blacklisted",
      className: "blacklisted-status",
      variant: "destructive" as const,
    },
  } as const;

  return (
    <div>
      <h2 className="text-primary-blue font-medium">Users</h2>
      <div className="chromebook:mt-10 mt-5 grid grid-cols-1 gap-[26px] md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={PeopleIllustration}
          label="Users"
          value={userStats.total}
          isLoading={isLoading}
        />
        <StatCard
          icon={UsersIllustration}
          label="Active Users"
          value={userStats.total}
          isLoading={isLoading}
        />
        <StatCard
          icon={LoanIllustration}
          label="Users with Loans"
          value={userStats.loans}
          isLoading={isLoading}
        />
        <StatCard
          icon={SavingsIllustration}
          label="Users with Savings"
          value={userStats.savings}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-10">
        <DataTable
          data={allUsers}
          isLoading={isLoading}
          columns={columns}
          statusColumn={{
            accessorKey: "status",
            configs: statusConfigs,
          }}
          actions={{
            items: [
              {
                id: 1,
                icon: <Icon size={14} icon="view" />,
                label: "View details",
                onClick: (row) => {
                  navigate(`/admin/users/${row.id}`);
                },
              },
              {
                id: 2,
                icon: (
                  <img
                    loading="lazy"
                    className="size-[14px] object-contain"
                    src={DeleteUserIcon}
                    alt="delete-user-icon"
                  />
                ),
                label: "Blacklist user",
                onClick: (row) => handleStatusChange(row.id, "blacklisted"),
              },
              {
                id: 3,
                icon: (
                  <img
                    loading="lazy"
                    className="size-[14px] object-contain"
                    src={UserIcon}
                    alt="user-icon"
                  />
                ),
                label: "Activate user",
                onClick: (row) => handleStatusChange(row.id, "active"),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

// Reusable StatCard component
const StatCard = ({
  icon,
  label,
  value,
  isLoading = false,
}: {
  icon: string;
  label: string;
  value: number;
  isLoading?: boolean;
}) => (
  <Card>
    <div className="flex flex-col px-[30px] py-5">
      {isLoading ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
      ) : (
        <img
          loading="lazy"
          className="size-10 overflow-hidden rounded-full"
          src={icon}
          alt={`${label} illustration`}
        />
      )}

      {isLoading ? (
        <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      ) : (
        <p className="text-secondary-font-color mt-[14px] !text-sm uppercase">
          {label}
        </p>
      )}

      {isLoading ? (
        <div className="mt-3 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
      ) : (
        <h2 className="mt-3 font-semibold">{formatAmount(value)}</h2>
      )}
    </div>
  </Card>
);

export default UsersPage;

const StatusCell = ({ row }: { row: CellContext<User, unknown>["row"] }) => {
  return <StatusBadge status={row.original.meta.status} />;
};
