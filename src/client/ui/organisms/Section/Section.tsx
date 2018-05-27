import * as React from 'react';

import StyledSection from './style'
import SectionTitle from '../../atoms/SectionTitle';

type SectionProps = {
    title: string;
    children: any;
}
const Section: React.SFC<SectionProps> = (props) => {
    const { title, children } = props;

    return (
        <StyledSection>
            <SectionTitle>{title}</SectionTitle>
            {children}
        </StyledSection>
    )
};

export default Section;
