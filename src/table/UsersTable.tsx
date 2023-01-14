/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Table as RBSTable, Row as RBSRow, Col as RBSCol } from 'react-bootstrap';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { getHumanViewError } from '../store/helpers';
import { useGetAllUsersQuery } from '../store';
import { User } from '../types';
import Avatar from './Avatar';
import Paginator from './Paginator';
import GlobalFilter from './GlobalFilter';
import ShowError from './ShowError';
import UserEditModalForm from './EditForm';
import { useAddToast } from '../Notify/toasts';
import { ErrorToast, LoadingToast } from '../Notify/LoadingWait';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Id',
    enableGlobalFilter: false,
  }),
  columnHelper.accessor('avatar', {
    header: '',
    cell: props => Avatar(props.getValue()),
    enableSorting: false,
    enableGlobalFilter: false,
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

const tableStyle = css`
  thead .bi {
    line-height: 1;
    margin-right: 0.5rem;
    &.increase {
      font-size: 1.25rem;
    }
    &.color-gray {
      color: var(--bs-gray-500);
    }
  }
`;

const pageSizeSet = [10, 20, 30, 40, 50];

function Table() {
  const { data = [], isLoading, isError, error } = useGetAllUsersQuery();

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: { pagination: { pageIndex: 0, pageSize: pageSizeSet[0] } },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });

  const [modalEditFormState, setModalEditFormState] = React.useState<{ show: true; user?: User } | { show: false }>({ show: false });

  const handleRowClick = (row: Row<User>) => {
    !modalEditFormState.show && setModalEditFormState({ show: true, user: row.original });
  };

  const handleAddButtonClick = () => {
    !modalEditFormState.show && setModalEditFormState({ show: true });
  };
  const hideModalForm = React.useCallback(() => setModalEditFormState({ show: false }), []);

  const addToast = useAddToast();

  React.useEffect(() => {
    if (isLoading) {
      return addToast(LoadingToast());
    }
  }, [addToast, isLoading]);

  React.useEffect(() => {
    if (isError && error) {
      return addToast(ErrorToast(getHumanViewError(error)));
    }
  }, [addToast, isError, error]);

  if (isError) {
    return <ShowError error={error} />;
  }

  const rowsCount = table.getFilteredRowModel().rows.length;

  return (
    <>
      {modalEditFormState.show && (
        <UserEditModalForm {...(modalEditFormState.user ? { user: modalEditFormState.user } : null)} onClose={hideModalForm} />
      )}

      <RBSRow className="align-items-center my-4">
        <RBSCol xs="auto">
          <Button variant="primary" size="sm" onClick={handleAddButtonClick}>
            <i className="bi bi-person-plus me-3"></i>
            Новый пользователь
          </Button>
        </RBSCol>
        <RBSCol xs="auto" className="ms-auto">
          <Paginator
            page={table.getState().pagination.pageIndex + 1}
            total={rowsCount}
            changePage={page => table.setPageIndex(page - 1)}
            pageSize={table.getState().pagination.pageSize}
            setPageSize={table.setPageSize}
            pageSizeSet={pageSizeSet}
            className="justify-content-start "
          />
        </RBSCol>
        <RBSCol xs="auto">
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} total={rowsCount} className="w1-50" />
        </RBSCol>
      </RBSRow>

      <RBSTable responsive hover borderless css={tableStyle}>
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
                              asc: <i className="bi bi-sort-up increase"></i>,
                              desc: <i className="bi bi-sort-down increase"></i>,
                            }[header.column.getIsSorted() as string] ?? <i className="bi bi-arrow-down-up color-gray"></i>
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
            <tr key={row.id} onClick={event => handleRowClick(row)}>
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

export default Table;
