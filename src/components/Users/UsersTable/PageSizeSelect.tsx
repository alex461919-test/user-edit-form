import { Form } from 'react-bootstrap';

const PageSizeSelect: React.FC<{ currentPageSize: number; onChangePageSize: (n: number) => void; pageSizeSet: number[] }> = ({
  currentPageSize,
  onChangePageSize,
  pageSizeSet,
}) => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Form.Label htmlFor="pageSizeSelect" className="my-0 me-2">
          На странице:
        </Form.Label>
      </div>
      <div>
        <Form.Select
          id="pageSizeSelect"
          size="sm"
          value={currentPageSize}
          onChange={e => {
            onChangePageSize(Number(e.target.value));
          }}>
          {pageSizeSet.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
};
export default PageSizeSelect;
