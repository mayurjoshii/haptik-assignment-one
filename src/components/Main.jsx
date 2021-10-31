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

import { actionTypes } from '../constants'
import { clone } from '../utils'

import StarDefault from '../assets/star-default.png'
import StarFilled from '../assets/star-filled.png'
import { ReactComponent as TrashIcon } from '../assets/trash-default.svg'

export const Main = () => {
    const [friendsData, setFriendsData] = React.useState([])
    const [enteredName, setEnteredName] = React.useState('')
    console.log(friendsData)
    const theme = useTheme()

    const handleFriendAddChange = (e) => setEnteredName(e.target.value)

    const handleActionClick = (type, id) => {
        console.log(type, id)
        const filteredArray = friendsData.filter((friend) => friend.id === id)

        if (!filteredArray.length) return

        console.log('Executing action')

        switch (type) {
            case actionTypes.delete: {
                const copyData = clone(friendsData)
                const arrayAfterDeletion = copyData.filter(
                    (friend) => friend.id !== id
                )

                setFriendsData(arrayAfterDeletion)
                break
            }

            case actionTypes.favourite:
            default: {
                const copyData = clone(friendsData)

                copyData.forEach((friend) => {
                    if (friend.id === id) friend.isFavourite = !friend.isFavourite
                })

                setFriendsData(copyData)
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

        const copyData = [...friendsData]

        copyData.push({
            name: enteredName,
            id: uuid()
        })
        setFriendsData(copyData)
        setEnteredName('')
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
            </Flexbox>
            <Line />

            {!friendsData.length && (
                <p style={{ color: '#ccc' }}>No friends added</p>
            )}

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