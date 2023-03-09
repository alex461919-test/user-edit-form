import styled from '@emotion/styled';
import { Image } from 'react-bootstrap';
import { PersonIcon } from './Icons';

const StyledSpan = styled.span`
  --avatar-size: 2.5rem;
  .img-avatar {
    width: var(--avatar-size);
    height: var(--avatar-size);
  }
  .ico-avatar {
    line-height: 1;
    border-radius: 50rem;
    background-color: var(--bs-gray-200);
    padding: 0.25rem;
  }
`;

function Avatar(source: string | undefined) {
  return (
    <StyledSpan>
      {source ? (
        <Image src={source} className="img-avatar" roundedCircle />
      ) : (
        <PersonIcon className="ico-avatar" size="2.5rem" color="var(--bs-gray-500)" />
      )}
    </StyledSpan>
  );
}

export default Avatar;
