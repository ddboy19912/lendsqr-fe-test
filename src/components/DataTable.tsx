import { StatusSelectItem } from "@/components/StatusSelectItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DeepKeyof } from "@/types/Table";
import {
  Column,
  type ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Icon from "./Icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export interface StatusConfig {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

interface DataTableProps<T extends { meta: { status: string } }> {
  data: T[];
  columns: ColumnDef<T>[];
  statusColumn?: {
    accessorKey: DeepKeyof<T>;
    configs: Record<string, StatusConfig>;
  };
  actions?: {
    items: {
      id: number;
      icon?: React.ReactNode;
      label: string;
      onClick: (row: T) => void;
    }[];
  };
  isLoading?: boolean;
  error?: string;
}

export default function DataTable<T extends { meta: { status: string } }>({
  data = [],
  columns,
  statusColumn,
  actions,
  isLoading,
  error,
}: Readonly<DataTableProps<T>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pendingFilters, setPendingFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setPendingFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      customFilter: (row, columnId, filterValue) => {
        const getNestedValue = <TDefault = unknown,>(
          obj: unknown,
          path: string
        ): TDefault | undefined => {
          if (!obj || typeof obj !== "object") return undefined;

          return path.split(".").reduce<TDefault | undefined>(
            (acc, part) => {
              if (acc && typeof acc === "object" && part in acc) {
                return (acc as Record<string, unknown>)[part] as TDefault;
              }
              return undefined;
            },
            obj as TDefault | undefined
          );
        };

        const cellValue = getNestedValue(row.original, columnId);
        const stringValue = String(cellValue).toLowerCase();
        const filterString = String(filterValue).toLowerCase();

        return stringValue.includes(filterString);
      },
    },
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 61,
    overscan: 10,
  });

  useEffect(() => {
    virtualizer.scrollToIndex(0);
  }, [columnFilters, virtualizer]);

  const handleApplyFilters = () => {
    setColumnFilters(pendingFilters);
  };

  // Helper function to get filter value
  const getFilterValue = (
    columnId: string,
    filters: ColumnFiltersState
  ): string => {
    return (filters.find((f) => f.id === columnId)?.value ?? "") as string;
  };

  // Generic filter change handler
  const handleFilterChange = (columnId: string, value: string) => {
    setPendingFilters((prev) => [
      ...prev.filter((f) => f.id !== columnId),
      { id: columnId, value },
    ]);
  };

  // Main render function for column filters
  const renderColumnFilter = (column: Column<T>, columnType: string) => {
    const currentValue = getFilterValue(column.id, pendingFilters);
    const placeholder = column.columnDef.header?.toString();

    switch (columnType) {
      case "status":
        return (
          <Select
            value={currentValue}
            onValueChange={(value) => handleFilterChange(column.id, value)}
          >
            <SelectTrigger className="border-primary-blue-20 ring-primary-blue w-full cursor-pointer rounded-md border p-2 text-sm shadow-none focus:ring-1 focus:outline-none">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="card !border-primary-blue-20 border">
              {renderStatusOptions(statusColumn?.configs || {})}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <FilterInput
            type="date"
            value={currentValue}
            onChange={(value) => handleFilterChange(column.id, value)}
          />
        );

      default:
        return (
          <FilterInput
            type="text"
            value={currentValue}
            placeholder={placeholder}
            onChange={(value) => handleFilterChange(column.id, value)}
          />
        );
    }
  };

  // Helper function to render status options
  const renderStatusOptions = (configs: Record<string, StatusConfig>) => {
    return Object.entries(configs).map(([value, config]) => (
      <StatusSelectItem key={value} value={value} config={config} />
    ));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <Card>
        {!isLoading ? (
          <div className="p-[30px] pb-0" ref={parentRef}>
            <Table className="chromebook:w-full w-[1000px]">
              <TableHeader className="bg-background sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="min-w-[1000px] border-none"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        <div className="flex items-center">
                          <p className="small-text text-secondary-font-color font-semibold uppercase">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </p>
                          <Popover>
                            <PopoverTrigger>
                              <Icon
                                className="ml-[10px] cursor-pointer"
                                icon="filter"
                                size={16}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="card space-y-4 p-5">
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleApplyFilters();
                                }}
                              >
                                <div className="space-y-4">
                                  {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanFilter())
                                    .map((column) => {
                                      const columnType =
                                        (
                                          column.columnDef.meta as {
                                            type?: string;
                                          }
                                        )?.type ?? "text";

                                      return (
                                        <div
                                          key={column.id}
                                          className="flex flex-col space-y-[6px]"
                                        >
                                          <label className="text-secondary-font-color text-sm">
                                            {column.columnDef.header?.toString() ??
                                              column.id}
                                          </label>
                                          {renderColumnFilter(
                                            column,
                                            columnType
                                          )}
                                        </div>
                                      );
                                    })}
                                </div>
                                <div className="mt-4 flex space-x-[14px]">
                                  <Button
                                    type="button"
                                    className="border-secondary-font-color text-secondary-font-color hover:bg-secondary-font-color cursor-pointer rounded-[8px] border bg-white px-[30.5px] py-[11.5px] text-sm font-semibold shadow-none transition-all duration-200 hover:text-white"
                                    onClick={() => {
                                      setPendingFilters([]);
                                      setColumnFilters([]);
                                    }}
                                  >
                                    Reset
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="bg-teal border-teal hover:text-teal cursor-pointer rounded-[8px] border px-[30.5px] py-[11.5px] text-sm font-semibold shadow-none transition-all duration-200 hover:bg-white"
                                  >
                                    Filter
                                  </Button>
                                </div>
                              </form>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </TableHead>
                    ))}
                    {actions && <TableHead className="w-[40px] border-none" />}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody
                style={{
                  height: `${Math.max(virtualizer.getTotalSize() + 25, 653)}px`,
                  position: "relative",
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index];

                  const statusValue = statusColumn
                    ? row.original.meta.status
                    : undefined;

                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `61px`,
                        transform: `translateY(${virtualRow.start}px)`,
                        display: "flex",
                        alignItems: "center",
                        borderColor: "#213F7D1A",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <TableCell
                            key={cell.id}
                            style={{ width: cell.column.getSize() }}
                            className="truncate"
                          >
                            {statusColumn &&
                            cell.column.id === statusColumn.accessorKey ? (
                              <Badge
                                className={cn(
                                  "rounded-[100px] border-none px-[14px] py-[6.5px] text-xs leading-[1.2] font-normal shadow-none",
                                  statusColumn.configs[String(statusValue)]
                                    ?.className
                                )}
                              >
                                {
                                  statusColumn.configs[String(statusValue)]
                                    ?.label
                                }
                              </Badge>
                            ) : (
                              <p className="text-secondary-font-color truncate !text-xs leading-[1.2] font-normal">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </p>
                            )}
                          </TableCell>
                        );
                      })}
                      {actions && (
                        <TableCell className="w-[40px] min-w-[40px]">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
                              asChild
                            >
                              <Button
                                variant="ghost"
                                className="h-8 w-8 cursor-pointer p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="card !border-primary-blue-20 min-w-[180px] rounded-[4px] p-0"
                            >
                              {actions.items.map((item) => (
                                <DropdownMenuItem
                                  key={item.id}
                                  onClick={() => item.onClick(row.original)}
                                  className="text-secondary-font-color hover:bg-secondary-font-color-06 flex h-[43px] cursor-pointer items-center gap-2 px-5 py-3 text-sm font-medium"
                                >
                                  {item.icon}
                                  {item.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}

                {rows.length === 0 && !isLoading && !error && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="h-full"
                    >
                      <div className="flex h-full flex-col items-center justify-center gap-3">
                        <Icon
                          icon="search-off"
                          className="text-secondary-font-color"
                          size={40}
                        />
                        <div className="text-center">
                          <h3 className="text-secondary-font-color mb-2 text-lg font-semibold">
                            {columnFilters.length > 0
                              ? "No matching results"
                              : "No data available"}
                          </h3>
                          <p className="text-secondary-font-color text-sm">
                            {columnFilters.length > 0
                              ? "Try adjusting your filters or search terms"
                              : "Check back later or add new data"}
                          </p>
                        </div>
                        {columnFilters.length > 0 && (
                          <Button
                            className="border-secondary-font-color text-secondary-font-color hover:bg-secondary-font-color cursor-pointer rounded-[8px] border bg-white px-[30.5px] py-[11.5px] text-sm font-semibold shadow-none transition-all duration-200 hover:text-white"
                            onClick={() => {
                              setPendingFilters([]);
                              setColumnFilters([]);
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="h-[720px] w-full space-y-3 p-8">
            {Array(9)
              .fill(0)
              .map((_, i) => {
                const key = "skeleton" + i;
                return (
                  <Skeleton key={key} className="h-[61px] w-full rounded-md" />
                );
              })}
          </div>
        )}
      </Card>
      <div className="flex flex-col items-center justify-between gap-5 py-5 lg:flex-row lg:gap-0">
        <span className="text-secondary-font-color flex items-center gap-2 text-sm">
          Showing{" "}
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="text-primary-blue h-[30px] w-[80px] cursor-pointer rounded-[4px] border-none bg-[#213F7D1A] px-3 py-[7px] shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-white">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  className="hover:bg-secondary-font-color-06"
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "}
          out of {data.length}
        </span>
        <div className="flex items-center space-x-5">
          <Button
            variant="outline"
            size="sm"
            className="size-6 cursor-pointer border-none bg-[#213F7D1A] shadow-none hover:bg-[#213F7D1A]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon icon="right-arrow" size={14} className="-rotate-180" />
          </Button>

          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const visiblePages = 5; // Always show 5 numbered buttons

            if (totalPages <= visiblePages) {
              return Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  className="hidden w-min border-none p-0 shadow-none"
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </Button>
              ));
            }

            const pages: (number | string)[] = [];

            // Always show first page
            pages.push(1);

            // Current page is in first 3 pages
            if (currentPage <= 3) {
              pages.push(2, 3, "...", totalPages - 1, totalPages);
            }
            // Current page is in last 3 pages
            else if (currentPage >= totalPages - 2) {
              pages.push("...", totalPages - 2, totalPages - 1, totalPages);
            }
            // Current page is in middle
            else {
              pages.push(
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
              );
            }

            return pages.map((page, index) => {
              if (page === "...") {
                const key = "ellipsis" + index;
                return (
                  <span key={key} className="mr-5">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  className={cn(
                    "text-secondary-font-color w-min cursor-pointer border-none bg-transparent p-0 text-sm opacity-60 shadow-none hover:bg-transparent hover:opacity-100",
                    currentPage === page && "opacity-100"
                  )}
                  onClick={() => table.setPageIndex(Number(page) - 1)}
                >
                  {page}
                </Button>
              );
            });
          })()}

          <Button
            variant="outline"
            className="size-6 cursor-pointer border-none bg-[#213F7D1A] shadow-none hover:bg-[#213F7D1A]"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon icon="right-arrow" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const FilterInput = ({
  type,
  value,
  placeholder,
  onChange,
}: {
  type: "date" | "text";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={cn(
      "border-primary-blue-20 ring-primary-blue w-full rounded-md border p-2 text-sm focus:ring-1 focus:outline-none",
      type === "date" ? "cursor-pointer" : ""
    )}
  />
);

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
);
