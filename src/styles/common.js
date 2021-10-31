import styled from "styled-components";
import { flexbox, space } from "styled-system";

export const Div = styled.div`
    ${space};
`

export const Flexbox = styled.div`
    display: flex;

    ${flexbox};
    ${space};
`

export const Input = styled.input`
    width: 100%;
`

export const Line = styled.hr`
    width: 100%;
    height: 1px;
    background-color: #bbb;
    border: none;

    ${space};
`

export const Button = styled.button`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.l}`};
    background-color: transparent;
    border: 1px solid black;
    border-radius: 4px;

    ${space};
`