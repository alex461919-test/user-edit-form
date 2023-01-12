/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Table as RBSTable } from 'react-bootstrap';
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import fakeUsers from '../data/fakeUsers';
import { isErrorWithMessage, isFetchBaseQueryError } from '../store/helpers';
import { useGetAllUsersQuery } from '../store';
import { User } from '../types';
import Avatar from './Avatar';
import React, { useCallback } from 'react';
import Paginator from './Paginator';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Id',
  }),
  columnHelper.accessor('avatar', {
    header: '',
    cell: props => Avatar(props.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor(row => `${row.lastName} ${row.firstName}`, {
    id: 'fullName',
    header: 'Полное имя',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Телефон',
  }),
];

const sortIconStyle = css`
  line-height: 1;
  margin-right: 0.5rem;
  &.increase {
    font-size: 1.25rem;
  }
  &.color-gray {
    color: var(--bs-gray-500);
  }
`;

const pageSizeSet = [10, 20, 30, 40, 50];

function Table() {
  //  const [userTableData, setUserTableData] = React.useState<User[]>([]);

  const { data = [], isLoading, isError, error } = useGetAllUsersQuery();

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    initialState: { pagination: { pageIndex: 0, pageSize: pageSizeSet[0] } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <span>Loading ...</span>;
  if (isError) {
    if (isFetchBaseQueryError(error)) {
      const errMsg = 'error' in error ? error.error : JSON.stringify({ status: error.status, data: error.data }, null, 2);
      return (
        <div>
          Error! <pre>{errMsg}</pre>
        </div>
      );
    } else if (isErrorWithMessage(error)) {
      return <div>Error! {error.message}</div>;
    }
  }
  /*
  console.log('page: ', table.getState().pagination.pageIndex + 1);
  console.log('total: ', table.getCoreRowModel().rows.length);
  console.log('pageSize: ', table.getState().pagination.pageSize);
*/
  return (
    <>
      <Paginator
        page={table.getState().pagination.pageIndex + 1}
        total={table.getCoreRowModel().rows.length}
        changePage={page => table.setPageIndex(page - 1)}
        pageSize={table.getState().pagination.pageSize}
        setPageSize={table.setPageSize}
        pageSizeSet={pageSizeSet}
        className="justify-content-start my-4"
      />
      <RBSTable responsive hover borderless>
        <thead className="table-secondary">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          ...(header.column.getCanSort() ? { role: 'button' } : null),
                          className: 'd-flex justify-content-start align-items-center',
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        {header.column.getCanSort()
                          ? {
                              asc: <i className="bi bi-sort-up increase" css={sortIconStyle}></i>,
                              desc: <i className="bi bi-sort-down increase" css={sortIconStyle}></i>,
                            }[header.column.getIsSorted() as string] ?? <i className="bi bi-arrow-down-up color-gray" css={sortIconStyle}></i>
                          : null}
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} role="button">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </RBSTable>
    </>
  );
}
//             return <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>;

export default Table;
