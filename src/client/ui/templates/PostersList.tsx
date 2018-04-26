import * as React from "react";
import styled, { StyledInterface } from 'styled-components'
import Poster from '../../ui/organisms/Poster/Poster';

interface IPostersList{
    posters: object[];
}

const UiPosterList:StyledInterface = styled.section`
   
`;

const PostersList: React.SFC<{}>  = (props: IPostersList) => {
    const { posters } = props
        return (
            <UiPosterList className="alt-poster-list row">
                {
                    posters.map(poster => {
                       return <Poster key={ poster.id }
                                name={ poster.name }
                                date={ poster.date }
                                time={ poster.time }
                                country={ poster.country }
                                rating={ poster.rating }
                                film_rating={ poster.film_rating }
                                genre={ poster.film_genre }
                                price={ poster.price }
                        />
                    })
                }
            </UiPosterList>
        );
};

export default  PostersList;