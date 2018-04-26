import * as React from "react";
import { IPosters } from '../../../api/models/poster';
import styled, { StyledInterface } from 'styled-components';
import { darkColor, fontWhite, darkPurple } from '../../style-vars';
import { Icon } from '../../atoms/icon'

const PosterItem:StyledInterface = styled.article`
    background-color: ${darkColor};
    display: flex;
    font-size: 19px;
    min-height: 250px;
    border-radius: 5px;
    overflow: hidden;
    -webkit-box-shadow: 7px 10px 38px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 10px 38px -9px rgba(0,0,0,0.75);
    box-shadow: 7px 10px 38px -9px rgba(0,0,0,0.75);
    transition: 0.32s;
    
    &:hover{
        box-shadow: none;
    }
    
    & .alt-poster__image{
        width: 30%;
    }
    
    & .alt-poster__image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    & .alt-poster__content{
        width: 70%;
        color: ${fontWhite};
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
    
    & .alt-poster__content .poster-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
   
    & .alt-poster__content .poster-header .film-rating{
        display: flex;
        align-items: center;
    }

    & .alt-poster__content .poster-header .film-rating i{
        display: block;
        background-color: ${ darkPurple }; 
        padding: 4px 10px;
        border-radius: 50%;
        font-size: 12px;
    }
    
    & .alt-poster__content .poster-info{
        font-size: 15px;
        margin: 10px 0;
        display: flex;
        align-items: center;
    }
    
     & .alt-poster__content .poster-info i{
        margin-right: 10px;
    }
    
    & .alt-poster__content .poster-description{
        font-size: 14px;
        background: #3C3C42;
        padding: 10px;
    }
`

const Poster = (props: IPosters) => {
    const {
        name,
        date,
        price,
        rating,
        film_rating,
        genre,
        country,
        time,
        description
    } = props
    return(
        <div className="col-md-6">
            <PosterItem className="alt-poster">
                <div className="alt-poster__image">
                    <img src="../../../assets/img/avenger.jpg" alt=""/>
                </div>
                <div className="alt-poster__content">
                    <header className="poster-header">
                        <h3 className="name">{ name }</h3>
                        <span className="film-rating flex">
                            <i>{ film_rating }</i>
                            +
                        </span>
                    </header>
                    <span className="poster-info time">
                        <Icon type="time" width="15px" height="15px"/>
                        { time }
                    </span>
                    <span className="poster-info country">
                         <Icon type="flag" width="15px" height="15px"/>
                        { country }
                    </span>
                    <span className="poster-info genre">
                         <Icon type="genre" width="15px" height="15px"/>
                        { genre }
                    </span>
                    <footer className="poster-description">
                        <p>
                            { description }
                        </p>
                    </footer>
                </div>
            </PosterItem>
        </div>
    );
};

export default Poster;