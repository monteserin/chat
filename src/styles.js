import styled from 'styled-components';

export const Msg = styled.p`
    background-color: ${props => props.isOwnMsg ? 'green' : 'red'};
    `;

