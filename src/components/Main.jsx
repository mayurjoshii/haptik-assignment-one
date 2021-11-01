import React from 'react'
import { useTheme } from 'styled-components'
import { v4 as uuid } from 'uuid'

import {
    Button,
    Div,
    Flexbox,
    Input,
    Line,
    StyledMain,
    StyledNameCard
} from '../styles'

import { actionTypes, rowsPerPage, sortBy } from '../constants'
import { clone, compareByFavourite, compareName } from '../utils'

import StarDefault from '../assets/star-default.png'
import StarFilled from '../assets/star-filled.png'
import { ReactComponent as TrashIcon } from '../assets/trash-default.svg'

export const Main = ({
    searchText,
    setSearchText,
    sortDataBy,
    setSoryDataBysortDataBy
}) => {
    const [friendsData, setFriendsData] = React.useState([])
    const [filteredData, setFilteredData] = React.useState([])
    const [enteredName, setEnteredName] = React.useState('')
    const theme = useTheme()

    React.useEffect(() => {
        if (!searchText) setFilteredData([])
        else if (searchText.length) {
            const searchFilteredData = friendsData.filter((friend) =>
                friend.name.toLowerCase().includes(searchText)
            )
            setFilteredData(searchFilteredData)
        }
    }, [searchText, friendsData])

    React.useEffect(() => {
        if (searchText) setSearchText('')

        if (sortDataBy === sortBy.none) {
            if (filteredData.length) setFilteredData([])
        } else if (sortDataBy === sortBy.name) {
            const copyData = clone(friendsData)

            setFilteredData(copyData.sort(compareName))
        } else if (sortDataBy === sortBy.favourite) {
            const copyData = clone(friendsData)

            setFilteredData(copyData.sort(compareByFavourite))
        }
    }, [sortDataBy, friendsData])

    const getDisplayData = () => {
        if (filteredData.length || !!searchText) {
            if (!filteredData.length) return <p>No friends found</p>

            return (
                <>
                    {filteredData.map((friend) => (
                        <NameCard
                            name={friend.name}
                            isFavourite={!!friend?.isFavourite}
                            handleActionClick={(type) =>
                                handleActionClick(type, friend.id)
                            }
                        />
                    ))}
                </>
            )
        }

        if (!friendsData.length)
            return <p style={{ color: '#ccc' }}>No friends added</p>

        return (
            <>
                {friendsData &&
                    !!friendsData.length &&
                    friendsData.map((friend) => (
                        <NameCard
                            name={friend.name}
                            isFavourite={!!friend?.isFavourite}
                            handleActionClick={(type) =>
                                handleActionClick(type, friend.id)
                            }
                        />
                    ))}
            </>
        )
    }

    const handleFriendAddChange = (e) => setEnteredName(e.target.value)

    const handleActionClick = (type, id) => {
        console.log(type, id)
        const filteredArray = friendsData.filter((friend) => friend.id === id)

        if (!filteredArray.length) return

        switch (type) {
            case actionTypes.delete: {
                const copyData = clone(friendsData)
                const arrayAfterDeletion = copyData.filter(
                    (friend) => friend.id !== id
                )

                setFriendsData(arrayAfterDeletion)
                if (filteredData.length) setFilteredData(arrayAfterDeletion)
                break
            }

            case actionTypes.favourite:
            default: {
                const copyData = clone(friendsData)

                copyData.forEach((friend) => {
                    if (friend.id === id)
                        friend.isFavourite = !friend.isFavourite
                })

                setFriendsData(copyData)
                if (filteredData.length) setFilteredData(copyData)
                break
            }
        }
    }

    const handleNameAddClick = (e) => {
        e.preventDefault()

        if (!enteredName) {
            console.log('Please Enter name')
            return
        }

        const copyData = clone(friendsData)

        copyData.push({
            name: enteredName,
            id: uuid()
        })
        setFriendsData(copyData)
        setEnteredName('')
    }

    const handlePaginationClick = () => {
        console.log('Clicked:--')
    }

    return (
        <StyledMain>
            <Flexbox
                as="form"
                onSubmit={handleNameAddClick}
                justifyContent="space-between"
                mb={theme.spacing.m}
                style={{ gap: '16px' }}
            >
                <Input
                    type="text"
                    onChange={handleFriendAddChange}
                    value={enteredName}
                />
                <Button type="submit">Add</Button>
                {/* <button
                    type="button"
                    onClick={() => setSoryDataBy(sortBy.name)}
                >
                    Name
                </button>
                <button
                    type="button"
                    onClick={() => setSoryDataBy(sortBy.favourite)}
                >
                    Favourite
                </button>
                <button
                    type="button"
                    onClick={() => setSoryDataBy(sortBy.none)}
                >
                    Original
                </button> */}
            </Flexbox>
            <Line />

            {getDisplayData()}

            {friendsData && friendsData.length > rowsPerPage && (
                <Flexbox justifyContent="space-between">
                    <p>
                        Page 1 of {Math.ceil(friendsData.length / rowsPerPage)}
                    </p>
                    <div>
                        <button onClick={handlePaginationClick}>Prev</button>
                        <button onClick={handlePaginationClick}>Next</button>
                    </div>
                </Flexbox>
            )}
        </StyledMain>
    )
}

const NameCard = ({ name, isFavourite, handleActionClick }) => {
    const { spacing } = useTheme()

    return (
        <StyledNameCard justifyContent="space-between" alignItems="center">
            <p>{name}</p>
            <Div>
                <Button
                    type="button"
                    onClick={() => handleActionClick(actionTypes.favourite)}
                >
                    <img
                        src={isFavourite ? StarFilled : StarDefault}
                        alt="Star icon"
                        width="18px"
                        height="18px"
                    />
                </Button>
                <Button
                    type="button"
                    ml={spacing.m}
                    onClick={() => handleActionClick(actionTypes.delete)}
                >
                    <TrashIcon width="18px" height="18px" />
                </Button>
            </Div>
        </StyledNameCard>
    )
}
