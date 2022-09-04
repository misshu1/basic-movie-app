import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FavoriteIcon = styled(FontAwesomeIcon)`
    position: absolute;
    zindex: 1;
    top: 1rem;
    right: 1.5rem;

    &:hover {
        cursor: pointer;
    }
`;
