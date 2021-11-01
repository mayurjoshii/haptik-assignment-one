import styled, { css } from 'styled-components'

import { Button, Flexbox, Input, Text } from './common'
import SearchIcon from '../assets/search.svg'

export const StyledWrapper = styled.div`
    width: 600px;
    margin: 32px auto;
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
`

export const StyledMain = styled.div`
    padding: ${({ theme }) => `${theme.spacing.m} ${theme.spacing.l}`};

    input {
        border-width: 1px;
        border-radius: 8px;
    }
`

export const StyledNameCard = styled(Flexbox)`
    margin: ${({ theme }) => `${theme.spacing.s} 0px`};
    padding: ${({ theme }) => `${theme.spacing.xs}`};
    transition: all 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.color.wildSand};
    }
`

export const StarButton = styled(Button)`
    ${({ isFavourite }) =>
        isFavourite &&
        css`
            border-color: ${({ theme }) => theme.color.goldenTainoi};
        `}

    &:hover {
        border-color: ${({ theme }) => theme.color.goldenTainoi};

        svg g {
            stroke: ${({ theme }) => theme.color.goldenTainoi};
        }
    }
`

export const TrashButton = styled(Button)`
    svg {
        fill: ${({ theme }) => theme.color.sunsetOrange};
    }

    border-color: ${({ theme }) => theme.color.sunsetOrange};

    &:hover {
        svg {
            fill: ${({ theme }) => theme.color.white};
        }

        background-color: ${({ theme }) => theme.color.sunsetOrange};
    }
`

export const SearchInput = styled(Input)`
    background: url(${SearchIcon}) no-repeat scroll 4px 50% / 15px 15px;
    padding: ${({ theme }) =>
        `${theme.spacing.xxs} ${theme.spacing.s} ${theme.spacing.xxs} ${theme.spacing.xxl}`};
    box-sizing: border-box;
    border-radius: 12px;
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.silverChalice};

    &:focus {
        border-color: ${({ theme }) => theme.color.cornflowerBlue};
    }
`

export const StyledSortByContainer = styled.div`
    width: 100%;
    position: relative;
    border: 1px solid ${({ theme }) => theme.color.mercury};
    text-align: center;
    margin-left: ${({ theme }) => theme.spacing.m};

    & > button:first-child {
        padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.l}`};

        &:hover {
            background-color: ${({ theme }) => theme.color.white};
        }
    }

    div {
        position: absolute;
        width: 100%;
    }

    button {
        background-color: ${({ theme }) => theme.color.white};
        padding: ${({ theme }) => `${theme.spacing.s} ${theme.spacing.l}`};
        border: none;
        transition: 0.3s all;

        &:hover {
            background-color: ${({ theme }) => theme.color.oysterBay};
        }
    }
`

export const SortByMenu = styled(Flexbox)`
    box-shadow: hsla(0, 0%, 80%, 0.2) 2px 4px 8px 4px;
`

export const SortByMenuButton = styled.button`
    &&& {
        ${({ isActive }) =>
            isActive &&
            css`
                background-color: ${({ theme }) => theme.color.twilightBlue};
            `}
    }
`

export const DeleteConfirmationModalContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 90%, 0.6);

    ${Flexbox} {
        background-color: ${({ theme }) => theme.color.white};
        max-width: 800px;
        height: 150px;
        margin: ${({ theme }) => `${theme.spacing.x8l} auto 0px`};
        box-shadow: hsla(0, 0%, 90%, 0.4) 2px 4px 8px 8px;
        border-radius: 10px;
        position: relative;

        & > button {
            position: absolute;
            right: 20px;
            top: 20px;
            background-color: transparent;
            border: none;
            outline: none;
            
            &, img{
                width: 15px;
                height: 15px;
            }
            
        }

        ${Text}{
            max-width: 500px;
            text-align: center;
        }
        
    }
`
