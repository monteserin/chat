import styled, { css } from 'styled-components';
import { Button, Input, Row } from 'antd';

export const Msg = styled.p`
display: flex;
${({ $isOwnMsg }) => $isOwnMsg ? css`
    text-align: right;
    background-color: #f77754;
    color:white;
    justify-self: flex-end;
  ` : css`
    background-color: rgb(164, 209, 200);
    justify-self: flex-start;

    `
  }
    /* background-color: ${props => props.$isOwnMsg ? 'green' : 'red'}; */
    padding: 10px;
    border-radius: 7px;
    `;



export const MsgRow = styled(Row)`
  background-color: white;
  border-radius: 40px;
    `;

export const MsgInput = styled(Input)`
background-color: transparent;
border: none;
`;

export const SendButton = styled(Button)`
border-radius: 100%;
width:33px
`;