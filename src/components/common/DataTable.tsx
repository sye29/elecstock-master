
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => any);
  className?: string;
  cell?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  className?: string;
  searchable?: boolean;
  pagination?: boolean;
  perPage?: number;
  actions?: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  className,
  searchable = true,
  pagination = true,
  perPage = 10,
  actions,
  emptyState,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = pagination
    ? filteredData.slice((currentPage - 1) * perPage, currentPage * perPage)
    : filteredData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 w-full max-w-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      "px-4 py-3 text-right text-sm font-medium text-muted-foreground",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
                {actions && <th className="px-4 py-3 text-left w-24"></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={item[keyField] as string}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column, colIndex) => {
                      const value =
                        typeof column.accessor === 'function'
                          ? column.accessor(item)
                          : item[column.accessor];
                      
                      return (
                        <td
                          key={colIndex}
                          className={cn(
                            "px-4 py-3 text-sm",
                            column.className
                          )}
                        >
                          {column.cell ? column.cell(value, item) : value}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="px-4 py-3 text-right">
                        {actions(item)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    {emptyState || "لا توجد بيانات للعرض"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            عرض {(currentPage - 1) * perPage + 1}-
            {Math.min(currentPage * perPage, filteredData.length)} من{" "}
            {filteredData.length} نتيجة
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <span className="text-sm mx-2">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
