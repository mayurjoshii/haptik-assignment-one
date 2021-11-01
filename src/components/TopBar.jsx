import React from 'react'
import styled from 'styled-components'

import { Flexbox, Input } from '../styles'

import SearchIcon from '../assets/search.svg'
import { sortBy } from '../constants'

export const SearchInput = styled(Input)`
    background: url(${SearchIcon}) no-repeat scroll 4px 50% / 15px 15px;
    padding: ${({ theme }) =>
        `${theme.spacing.xxs} ${theme.spacing.xxs} ${theme.spacing.xxs} ${theme.spacing.xxl}`};
    box-sizing: border-box;
`

export const StyledSortByContainer = styled.div`
    width: 100%;
    position: relative;

    div {
        position: absolute;
    }

    div,
    button {
        width: 100%;
    }
`

export const TopBar = ({
    handleSearchChange,
    searchText,
    sortDataBy,
    setSoryDataBy
}) => {
    const [isSortByHover, setIsSortByHover] = React.useState(false)

    const getSoryByLabelByValue = () => {
        switch (sortDataBy) {
            case sortBy.name:
                return 'Name'

            case sortBy.favourite:
                return 'Favourite'

            case sortBy.none:
            default:
                return 'Original'
        }
    }

    return (
        <Flexbox
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: '12px 16px' }}
        >
            <p>Friends List</p>
            <Flexbox alignItems="center">
                <SearchInput
                    value={searchText}
                    onChange={handleSearchChange}
                    type="text"
                />
                <StyledSortByContainer
                    onMouseOver={() => setIsSortByHover(true)}
                    onMouseLeave={() => setIsSortByHover(false)}
                >
                    <button>Sort By: {getSoryByLabelByValue()}</button>
                    {isSortByHover && (
                        <Flexbox flexDirection="column" alignItems="stretch">
                            <button onClick={() => setSoryDataBy(sortBy.name)}>
                                Name
                            </button>
                            <button
                                onClick={() => setSoryDataBy(sortBy.favourite)}
                            >
                                Fav
                            </button>
                            <button onClick={() => setSoryDataBy(sortBy.none)}>
                                Original
                            </button>
                        </Flexbox>
                    )}
                </StyledSortByContainer>
            </Flexbox>
        </Flexbox>
    )
}
