import React from 'react'
import { TopBar } from './TopBar'

import { Line, StyledWrapper } from '../styles'
import { Main } from './Main'

export const Wrapper = () => {
    const [searchText, setSearchText] = React.useState('')

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <StyledWrapper>
            <TopBar
                handleSearchChange={handleSearchChange}
                searchText={searchText}
            />
            <Line />
            <Main searchText={searchText} />
        </StyledWrapper>
    )
}
