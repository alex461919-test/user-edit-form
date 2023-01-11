/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import fakeUsers from '../data/fakeUsers';
import { isErrorWithMessage, isFetchBaseQueryError } from '../store/helpers';
import { useGetAllUsersQuery } from '../store';
import { User } from '../types';
import Avatar from './Avatar';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Id',
  }),
  columnHelper.accessor('avatar', {
    header: '',
    cell: props => Avatar(props.getValue()),
  }),
  columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
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

function Table() {
  //  const [userTableData, setUserTableData] = React.useState<User[]>([]);

  const { data = [], isLoading, isError, error } = useGetAllUsersQuery();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
      </table>
      <div className="h-4" />
    </div>
  );
}

export default Table;
