import styled from "styled-components";


export const Box = styled.div`
padding: 30px;
border-right: 1px solid black;
`

export const Msg = styled.p`
    background-color: ${props => props.isOwnMsg ? 'green' : 'red'};
    `;

export const Error = styled.p`
color:red;
display: ${props => props.visible ? 'block' : 'none'};
`;