/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Col, Form, Row, RowProps } from 'react-bootstrap';
import { PaginationControl, PaginationControlProps } from './PaginationControl';

interface PageSizeControl {
  pageSize: number;
  setPageSize: (p: number) => void;
  pageSizeSet: number[];
}
const rowStyle = css`
  flex-wrap: nowrap;
  align-items: center;
  ul,
  label {
    margin-bottom: 0;
  }
  label {
    margin-right: -1rem;
  }
`;
const Paginator: React.FC<Pick<PaginationControlProps, 'page' | 'total' | 'changePage'> & PageSizeControl & RowProps> = ({
  page,
  total,
  changePage = console.log,
  pageSize,
  setPageSize = console.log,
  pageSizeSet,
  ...rowsProps
}) => {
  /*
  console.log('page: ', page);
  console.log('total: ', total);
  console.log('pageSize: ', pageSize);
*/
  return (
    <Row {...rowsProps} css={rowStyle}>
      <Col xs="auto">
        <PaginationControl page={page} total={total} limit={pageSize} changePage={changePage} between={4} ellipsis={1} size="sm" />
      </Col>
      <Col xs="auto">
        <Form.Label htmlFor="pageSizeSelect">На странице:</Form.Label>
      </Col>
      <Col xs="auto">
        <Form.Select
          id="pageSizeSelect"
          size="sm"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}>
          {pageSizeSet.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Paginator;
