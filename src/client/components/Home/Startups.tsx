import * as React from 'react';

import Section from '../../ui/organisms/Section';

export interface StartupsProps {

}

class Startups extends React.Component<StartupsProps, any> {
    render() {
        return (
            <Section title="Стартапы">
                Some div
            </Section>
        );
    }
}

export default Startups;