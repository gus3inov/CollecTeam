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
        <StyledSection className="section">
           <div>
               <SectionTitle>{title}</SectionTitle>
           </div>
            <div className="section-content">
                {children}
            </div>
        </StyledSection>
    )
};

export default Section;
