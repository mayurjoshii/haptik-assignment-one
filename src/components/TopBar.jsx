import React from 'react'

import {
    Flexbox,
    SearchInput,
    SortByMenu,
    SortByMenuButton,
    StyledSortByContainer
} from '../styles'

import { sortBy } from '../constants'

export const TopBar = ({
    handleSearchChange,
    searchText,
    sortDataBy,
    setSoryDataBy,
    friendsData
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

    console.log(sortDataBy === sortBy.name)
    return (
        <Flexbox
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: '12px 16px' }}
        >
            <p>
                Friends List {!!friendsData.length && `(${friendsData.length})`}
            </p>
            <Flexbox alignItems="center">
                <SearchInput
                    value={searchText}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Search for a friend"
                />
                <StyledSortByContainer
                    onMouseOver={() => setIsSortByHover(true)}
                    onMouseLeave={() => setIsSortByHover(false)}
                >
                    <button>Sort By: {getSoryByLabelByValue()}</button>
                    {isSortByHover && (
                        <SortByMenu flexDirection="column" alignItems="stretch">
                            <SortByMenuButton
                                type="button"
                                onClick={() => setSoryDataBy(sortBy.name)}
                                isActive={sortDataBy === sortBy.name}
                            >
                                Name
                            </SortByMenuButton>
                            <SortByMenuButton
                                type="button"
                                onClick={() => setSoryDataBy(sortBy.favourite)}
                                isActive={sortDataBy === sortBy.favourite}
                            >
                                Favourite
                            </SortByMenuButton>
                            <SortByMenuButton
                                type="button"
                                onClick={() => setSoryDataBy(sortBy.none)}
                                isActive={sortDataBy === sortBy.none}
                            >
                                Original
                            </SortByMenuButton>
                        </SortByMenu>
                    )}
                </StyledSortByContainer>
            </Flexbox>
        </Flexbox>
    )
}
