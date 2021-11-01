import React from 'react'
import { useTheme } from 'styled-components'
import { v4 as uuid } from 'uuid'

import {
    Button,
    DeleteConfirmationModalContainer,
    Div,
    Flexbox,
    Input,
    Line,
    StarButton,
    StyledMain,
    StyledNameCard,
    Text,
    TrashButton
} from '../styles'

import {
    actionTypes,
    paginationValues,
    rowsPerPage,
    sortBy
} from '../constants'
import { clone, compareByFavourite, compareName } from '../utils'

import { ReactComponent as StarDefault } from '../assets/star-default.svg'
import StarFilled from '../assets/star-filled.png'
import { ReactComponent as TrashIcon } from '../assets/trash-default.svg'
import CloseIcon from '../assets/close.png'

export const Main = ({
    searchText,
    setSearchText,
    sortDataBy,
    friendsData,
    setFriendsData
}) => {
    const [filteredData, setFilteredData] = React.useState([])
    const [enteredName, setEnteredName] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)

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
        const getDataToDisplay = (data) => {
            const indexOfLastElement = currentPage * rowsPerPage
            const indexOfFirstElement = indexOfLastElement - rowsPerPage

            return data.slice(indexOfFirstElement, indexOfLastElement)
        }

        if (filteredData.length || !!searchText) {
            if (!filteredData.length)
                return (
                    <Text color={theme.color.silver} mt={theme.spacing.m}>
                        No friends found
                    </Text>
                )

            return (
                <>
                    {getDataToDisplay(filteredData).map((friend) => (
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
            return (
                <Text color={theme.color.alto} mt={theme.spacing.m}>
                    No friends added
                </Text>
            )

        return (
            <>
                {friendsData &&
                    !!friendsData.length &&
                    getDataToDisplay(friendsData).map((friend) => (
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

    const handlePaginationClick = (type) => {
        switch (type) {
            case paginationValues.prev:
                setCurrentPage(currentPage - 1)
                break

            case paginationValues.next:
            default:
                setCurrentPage(currentPage + 1)
                break
        }
    }

    const getPagination = () => {
        const getTotalPages = (data) => Math.ceil(data.length / rowsPerPage)

        const getPaginationContent = (data) => {
            const totalPages = getTotalPages(data)

            return (
                <Flexbox justifyContent="space-between" mt={theme.spacing.xl}>
                    <Text color={theme.color.silverChalice}>
                        Page{' '}
                        <Text as="span" color={theme.color.royalBlue}>
                            {currentPage}
                        </Text>{' '}
                        / {totalPages}
                    </Text>
                    <div>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={currentPage <= 1}
                            onClick={() =>
                                handlePaginationClick(paginationValues.prev)
                            }
                        >
                            Prev
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            disabled={currentPage >= totalPages}
                            onClick={() =>
                                handlePaginationClick(paginationValues.next)
                            }
                            ml={theme.spacing.s}
                        >
                            Next
                        </Button>
                    </div>
                </Flexbox>
            )
        }

        if (filteredData && filteredData.length) {
            if (filteredData.length > rowsPerPage)
                return getPaginationContent(filteredData)

            return null
        } else if (friendsData && friendsData.length > rowsPerPage)
            return getPaginationContent(friendsData)

        return null
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
                    placeholder="Enter a name to add to friends list"
                />
                <Button type="submit" disabled={!enteredName}>
                    Add
                </Button>
            </Flexbox>
            <Line />

            {getDisplayData()}

            {getPagination()}
        </StyledMain>
    )
}

const NameCard = ({ name, isFavourite, handleActionClick }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const { spacing } = useTheme()

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleDeleteClick = () => {
        handleActionClick(actionTypes.delete)
        toggleModal()
    }

    return (
        <>
            <StyledNameCard justifyContent="space-between" alignItems="center">
                <p>{name}</p>
                <Div>
                    <StarButton
                        type="button"
                        onClick={() => handleActionClick(actionTypes.favourite)}
                        isFavourite={isFavourite}
                    >
                        {isFavourite ? (
                            <img
                                src={StarFilled}
                                alt="Star icon"
                                width="18px"
                                height="18px"
                            />
                        ) : (
                            <StarDefault width="18px" height="18px" />
                        )}
                    </StarButton>
                    <TrashButton
                        type="button"
                        ml={spacing.m}
                        onClick={toggleModal}
                    >
                        <TrashIcon width="18px" height="18px" />
                    </TrashButton>
                </Div>
            </StyledNameCard>
            {isModalOpen && (
                <DeleteConfirmationModalContainer>
                    <Flexbox
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <button type="button" onClick={toggleModal}>
                            <img src={CloseIcon} alt="Close icon in black" />
                        </button>
                        <Text mb={spacing.l}>
                            Do you want to delete <strong>'{name}'</strong> from the list?
                        </Text>
                        <div>
                            <Button
                                type="button"
                                onClick={toggleModal}
                                mr={spacing.s}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleDeleteClick}
                                ml={spacing.s}
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </div>
                    </Flexbox>
                </DeleteConfirmationModalContainer>
            )}
        </>
    )
}
