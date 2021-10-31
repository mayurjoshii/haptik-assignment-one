import styled from "styled-components"

const StyledText = styled.p`
    margin: 2px 0px;
`

export const Text = ({ children }) => {
    return (
        <StyledText>
            {children}
        </StyledText>
    )
}