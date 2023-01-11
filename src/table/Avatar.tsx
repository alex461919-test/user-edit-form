import styled from '@emotion/styled';
import { Image } from 'react-bootstrap';

const StyledSpan = styled.span`
  --avatar-size: 2rem;
  .img-avatar {
    width: var(--avatar-size);
    height: var(--avatar-size);
  }
  .ico-avatar {
    display: inline-block;
    font-size: var(--avatar-size);
    line-height: 1;
    border-radius: 50rem;
    background-color: var(--bs-gray-200);
    color: var(--bs-gray-400);
  }
`;

function Avatar(source: string | undefined) {
  return (
    <StyledSpan>{source ? <Image src={source} className="img-avatar" roundedCircle /> : <i className="bi bi-person ico-avatar"></i>}</StyledSpan>
  );
}

export default Avatar;
