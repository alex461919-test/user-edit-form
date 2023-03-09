import styled from '@emotion/styled';
import { Image } from 'react-bootstrap';
import { PersonIcon } from './Icons';

const AVATAR_SIZE = '2.5rem';
const StyledSpan = styled.span`
  .img-avatar {
    width: ${AVATAR_SIZE};
    height: ${AVATAR_SIZE};
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
        <PersonIcon className="ico-avatar" size={AVATAR_SIZE} color="var(--bs-gray-500)" />
      )}
    </StyledSpan>
  );
}

export default Avatar;
