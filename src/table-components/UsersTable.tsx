/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row as TableRow,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { emptyArray, getHumanViewError } from '../service/helpers';
import { useGetAllUsersQuery } from '../service/store';
import { User } from '../types';
import Avatar from './Avatar';
import GlobalFilter from './GlobalFilter';
import UserEditModalForm from './EditForm';
import { useAddToast } from '../notify/toast-control';
import { ErrorToast, LoadingToast } from '../notify/toastSet';
import AppPagination from './Pagination';
import PageSizeControl from './PageSizeControl';
import Icon from './Icons';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('avatar', {
    header: '',
    cell: props => Avatar(props.getValue()),
    enableSorting: false,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor(row => `${row.lastName} ${row.firstName}`, {
    id: 'fullName',
    header: 'Имя',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Телефон',
  }),
];

const tableStyle = css`
  thead svg {
    line-height: 1;
    margin-right: 0.5rem;
  }
  tbody td {
    vertical-align: middle;
  }
`;

const pageSizeSet = [10, 20, 30, 40, 50];

function UsersTable() {
  const { data = emptyArray, isLoading, isError, error, isFetching } = useGetAllUsersQuery();

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
    getRowId: originalRow => originalRow.id,
  });

  const [modalEditFormState, setModalEditFormState] = React.useState<{ show: true; user?: User } | { show: false }>({ show: false });

  const handleRowClick = (row: TableRow<User>) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  React.useEffect(() => {
    if (isError && error) {
      return addToast(ErrorToast(getHumanViewError(error)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const rowsCount = table.getFilteredRowModel().rows.length;
  /*

*/
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = Math.ceil(rowsCount / pageSize);

  return (
    <>
      {modalEditFormState.show && (
        <UserEditModalForm {...(modalEditFormState.user ? { user: modalEditFormState.user } : null)} onClose={hideModalForm} />
      )}

      <Row className="align-items-center my-3">
        <Col xs="auto" className="my-2 me-auto">
          <Button variant="primary" size="sm" onClick={handleAddButtonClick}>
            <Icon.Plus className="me-2" color="white" size="1.25rem" />
            Новый пользователь
          </Button>
        </Col>
        <Col xs="auto" className="my-2">
          {totalPages > 1 ? (
            <div className="d-flex align-items-center">
              <AppPagination
                {...{
                  totalCount: rowsCount,
                  pageSize,
                  siblingCount: 2,
                  currentPage,
                  onChangePage: page => table.setPageIndex(page - 1),
                  disabled: isFetching,
                }}
                className="my-3 me-4"
              />
              <PageSizeControl onChangePageSize={table.setPageSize} currentPageSize={pageSize} pageSizeSet={pageSizeSet} />
            </div>
          ) : null}
        </Col>
        <Col xs="auto" className="my-2">
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} total={rowsCount} className="w1-50" />
        </Col>
      </Row>

      <Table responsive hover borderless css={tableStyle}>
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
                              asc: <Icon.SortUp size="1.25rem" />,
                              desc: <Icon.SortDown size="1.25rem" />,
                            }[header.column.getIsSorted() as string] ?? <Icon.ArrowDownUp color="var(--bs-gray-600)" />
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
      </Table>
    </>
  );
}

export default UsersTable;
