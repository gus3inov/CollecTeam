import * as React from 'react';

import StyledSection from './style';
import SectionTitle from '../../atoms/SectionTitle';

type SectionProps = {
	title: string;
	children: any;
	bg: boolean;
};

const Section: React.SFC<SectionProps> = (props) => {
	const {title, children, bg} = props;

	return (
		<StyledSection className="section" bg={bg}>
			<div>
				<SectionTitle>{title}</SectionTitle>
			</div>
			<div className="section-content">
				{children}
			</div>
		</StyledSection>
	);
};

export default Section;
