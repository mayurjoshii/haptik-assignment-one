import styled from 'styled-components'
import { Flexbox } from './common'

export const StyledWrapper = styled.div`
    width: 600px;
    margin: 32px auto;
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
`

export const StyledMain = styled.div`
    padding: ${({ theme }) => `${theme.spacing.m} ${theme.spacing.l}`};
`

export const StyledNameCard = styled(Flexbox)`
    margin: ${({ theme }) => `${theme.spacing.s} 0px`};
    padding: ${({ theme }) => `${theme.spacing.xs}`};

    &:hover{
        background-color: #dcdcdc;
    }
`