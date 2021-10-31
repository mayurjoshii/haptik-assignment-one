import React from 'react'
import styled from 'styled-components'

import { Flexbox, Input } from '../styles'

import SearchIcon from '../assets/search.svg'

export const SearchInput = styled(Input)`
    background: url(${SearchIcon}) no-repeat scroll 4px 50% / 15px 15px;
    padding: ${({ theme }) =>
        `${theme.spacing.xxs} ${theme.spacing.xxs} ${theme.spacing.xxs} ${theme.spacing.xxl}`};
    box-sizing: border-box;
`

export const TopBar = ({ handleSearchChange, searchText }) => {
    return (
        <Flexbox
            justifyContent="space-between"
            style={{ padding: '12px 16px' }}
        >
            <p>Friends List</p>
            <div>
                <SearchInput
                    value={searchText}
                    onChange={handleSearchChange}
                    type="text"
                />
            </div>
        </Flexbox>
    )
}
