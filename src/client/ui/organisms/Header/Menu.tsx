import * as React from "react"
import styled from 'styled-components'
import {darkColor} from "../../style-vars"
import { Link } from 'react-router-dom'

export interface OriginProps {
    isOpen: boolean;
    toggleOpen(): any;
}

const StyledMenu = styled.div`
    background: ${darkColor};
    width: ${ (props: { isOpen: boolean }) => props.isOpen ? '300px': '100px' };
    height: 100vh;
    position: fixed;
    top: 0;
    transition: 0.32s;
    z-index: 101;
    font-size: ${ (props: { isOpen: boolean }) => props.isOpen ? '30px': '43px' };
`

const Menu = (props: OriginProps) => {
    return(
        <StyledMenu className="alt-menu" isOpen={ props.isOpen }>
            <div className="logo">
                { props.isOpen ? <img src="../../../../assets/img/logo.svg" alt=""/> : <img src="../../../../assets/img/logo-min.svg" alt=""/> }
            </div>
            <nav className="alt-menu__nav">
                <ul>
                    <li>
                        <Link to="/" >
                            <span>
                                { props.isOpen ? (<span><i className="fa fa-home"></i>Home</span>) : (<i className="fa fa-home"></i>)}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/posters">
                            <span>
                                { props.isOpen ? (<span><i className="fa fa-film"></i>Posters</span>) : (<i className="fa fa-film"></i>)}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                             <span>
                                { props.isOpen ? (<span><i className="fa fa-align-left"></i>Blog</span>) : (<i className="fa fa-align-left"></i>)}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </StyledMenu>
    )
}


export default Menu