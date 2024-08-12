'use client';
import React, { useMemo, useState } from 'react';
import { useGetHistoryTransactions } from '@/hooks/use-get-history-transactions';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { columns } from './Columns';
import { Button } from '@/components/ui/button';
import { DataTableFacetedFilter } from '@/components/datable/FacetedFilters';
import { DownloadIcon } from 'lucide-react';
import { DataTableViewOptions } from '@/components/datable/ColumnToggle';
import SkeletonWrapper from '@/components/SkeletonWrapper';
interface Props {
  from: Date;
  to: Date;
}
const emptyData: any[] = [];
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});
function TransactionTable({ from, to }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const history = useGetHistoryTransactions(from, to);
  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const table = useReactTable({
    data: history.data || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const categoriesOptions = useMemo(() => {
    const categoriesMap = new Map();
    history.data?.forEach((transaction) => {
      categoriesMap.set(transaction.category, {
        value: transaction.category,
        label: `${transaction.categoryIcon} ${transaction.category}`,
      });
    });
    const uniqueCategories = new Set(categoriesMap.values());
    return Array.from(uniqueCategories);
  }, [history.data]);

  return (
    <div className='w-full'>
      <div className='flex flex-wrap items-end justify-between gap-2 py-4'>
        <div className='flex gap-2'>
          {table.getColumn('category') && (
            <DataTableFacetedFilter
              title='Category'
              column={table.getColumn('category')}
              options={categoriesOptions}
            />
          )}
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              title='Type'
              column={table.getColumn('type')}
              options={[
                { label: 'Income', value: 'income' },
                { label: 'Expense', value: 'expense' },
              ]}
            />
          )}
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant={'outline'}
            size={'sm'}
            className='ml-auto h-8 lg:flex'
            onClick={() => {
              const data = table.getFilteredRowModel().rows.map((row) => ({
                category: row.original.category,
                categoryIcon: row.original.categoryIcon,
                description: row.original.description,
                type: row.original.type,
                amount: row.original.amount,
                formattedAmount: row.original.formattedAmount,
                date: row.original.date,
              }));
              handleExportCSV(data);
            }}
          >
            <DownloadIcon className='mr-2 h-4 w-4' />
            Export CSV
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <SkeletonWrapper isLoading={history.isFetching}>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </SkeletonWrapper>
    </div>
  );
}

export default TransactionTable;
