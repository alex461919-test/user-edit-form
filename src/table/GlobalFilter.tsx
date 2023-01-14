/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const filterStyle = css`
  position: relative;
  .found-counter {
    display: flex;
    right: 3rem;
    top: 0;
    bottom: 0;
    align-items: center;
    position: absolute;
    color: gray;
    font-size: small;
    font-style: italic;
    z-index: 1000;
  }
`;

interface GlobalFilterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
  total: number;
}

function GlobalFilter({ globalFilter, setGlobalFilter, total, ...divProps }: GlobalFilterProps) {
  const [inputValue, setInputValue] = React.useState(globalFilter || '');
  const [, startTransition] = React.useTransition();

  const searchAfter = (v: string) => v.length > 0;

  const handleChange = (value: string) => {
    setInputValue(value);
    startTransition(() => {
      setGlobalFilter(searchAfter(value) ? value : '');
    });
  };
  if (total <= 0) return null;
  return (
    <div css={filterStyle} {...divProps}>
      <InputGroup size="sm">
        <Form.Control
          placeholder="Найти ..."
          value={inputValue}
          onChange={e => {
            handleChange(e.target.value);
          }}
        />
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
      </InputGroup>
      {searchAfter(inputValue) ? <span className="found-counter">Найдено: {total}</span> : null}
    </div>
  );
}

export default GlobalFilter;
