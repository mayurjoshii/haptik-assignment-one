import React from 'react'
import { TopBar } from './TopBar'

import { Line, StyledWrapper } from '../styles'
import { Main } from './Main'
import { sortBy } from '../constants'

export const Wrapper = () => {
    const [friendsData, setFriendsData] = React.useState([])
    const [searchText, setSearchText] = React.useState('')
    const [sortDataBy, setSoryDataBy] = React.useState(sortBy.none)

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <StyledWrapper>
            <TopBar
                handleSearchChange={handleSearchChange}
                searchText={searchText}
                sortDataBy={sortDataBy}
                setSoryDataBy={setSoryDataBy}
                friendsData={friendsData}
            />
            <Line />
            <Main
                searchText={searchText}
                setSearchText={setSearchText}
                sortDataBy={sortDataBy}
                setSoryDataBy={setSoryDataBy}
                friendsData={friendsData}
                setFriendsData={setFriendsData}
            />
        </StyledWrapper>
    )
}
