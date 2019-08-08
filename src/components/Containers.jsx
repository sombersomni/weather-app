import styled from 'styled-components';

export const Description = styled.p`
    text-align: left;
    justify-content: newspaper;
    &:first-letter {
        font-size: 2em;
        color: ${props => props.color || '#00ACF9'}
    }
`;