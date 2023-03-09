/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { IPaginationParams, usePagination } from '../service/usePagination';

const AppPagination: React.FC<
  IPaginationParams & {
    disabled?: boolean;
    onChangePage?: (n: number) => void;
  } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ totalCount, pageSize, siblingCount = 2, currentPage, disabled = false, onChangePage = () => {}, ...navProps }) => {
  const pagination = usePagination({ totalCount, pageSize, siblingCount, currentPage });

  const clickHandler = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    event => {
      const page = Number((event.target as HTMLElement).closest('a')?.dataset.page);
      page && onChangePage(page);
    },
    [onChangePage],
  );
  const totalPages = Math.ceil(totalCount / pageSize);
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return (
    <nav {...navProps}>
      <Pagination size="sm" className="my-0" css={styles} onClick={clickHandler}>
        <Pagination.Prev data-page={prevPage} disabled={disabled || !prevPage} />

        {pagination.map(item => {
          return (
            <Pagination.Item key={item.pageN} active={item.pageN === currentPage} disabled={disabled} data-page={item.pageN}>
              {item.type === 'dots' ? '...' : item.pageN}
            </Pagination.Item>
          );
        })}

        <Pagination.Next data-page={nextPage} disabled={disabled || !nextPage} />
      </Pagination>
    </nav>
  );
};
const styles = css`
  .page-link {
    min-width: 2rem;
    text-align: center;
  }
`;

export default AppPagination;
