import styled, { css } from 'styled-components'
import { flexbox, space } from 'styled-system'

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
    padding: ${({ theme }) => `0px ${theme.spacing.s}`};
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
    transition: all 0.2s;

    &:disabled {
        color: ${({ theme }) => theme.color.silverChalice};
        border-color: ${({ theme }) => theme.color.silverChalice};
    }

    ${({ variant }) =>
        variant === 'primary' &&
        css`
            background-color: ${({ theme }) => theme.color.persianBlue};
            color: ${({ theme }) => theme.color.white};
            font-weight: 800;

            &:hover {
                background-color: ${({ theme }) => theme.color.royalBlue};
            }
        `};

    ${({ variant }) =>
        variant === 'secondary' &&
        css`
            background-color: ${({ theme }) => theme.color.spray};
            color: ${({ theme }) => theme.color.codGray};
            border-color: ${({ theme }) => theme.color.spray};

            &:hover {
                background-color: ${({ theme }) => theme.color.iceCold};
            }

            &:disabled {
                background-color: ${({ theme }) => theme.color.spray};
                border-color: ${({ theme }) => theme.color.spray};
            }
        `};

    ${({ variant }) =>
        variant === 'danger' &&
        css`
            background-color: ${({ theme }) => theme.color.sunsetOrange};
            color: ${({ theme }) => theme.color.white};
            border-color: ${({ theme }) => theme.color.sunsetOrange};
            
            &:hover {
                background-color: ${({ theme }) => theme.color.white};
                color: ${({ theme }) => theme.color.sunsetOrange};
            }

            &:disabled {
                background-color: ${({ theme }) => theme.color.spray};
                border-color: ${({ theme }) => theme.color.spray};
            }
        `}

    ${space};
`

export const Text = styled.p`
    color: ${({ color, theme }) => color || theme.color.codGray};

    ${space};
`
