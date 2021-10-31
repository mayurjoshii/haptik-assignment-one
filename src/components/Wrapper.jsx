import { TopBar } from "./TopBar"

import { Line, StyledWrapper } from "../styles"
import { Main } from "./Main"

export const Wrapper = () => {
    return(
        <StyledWrapper>
            <TopBar />
            <Line />
            <Main />
        </StyledWrapper>
    )
}