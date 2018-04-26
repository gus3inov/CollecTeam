import * as React from "react"
import styled from 'styled-components'
import { darkColor } from "../../style-vars";

const StyledHeader = styled.header`
  background: ${darkColor};
  padding: 20px;
  border-bottom: 1px solid #fff;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

export interface OriginProps {
    isOpen?: boolean;
    toggleOpen?(): any;
}

const  Header = (props: OriginProps ) => {
        const { toggleOpen, isOpen } = props;

        return (
            <StyledHeader className="alt-header container-fluid">
                <div className="row">
                    <div className="col-md-5">
                        <button className={`toggle-button ${isOpen ? 'toggle-button_open' : 'toggle-button_close'}`} onClick={ toggleOpen }>
                            <div className="icon toggle">
                                <i></i><i></i><i></i>
                            </div>
                        </button>
                    </div>
                </div>
            </StyledHeader>
        )
}

export default Header