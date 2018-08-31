import * as React from 'react';

import StyledFormStartup from './style';

export interface FormStartupProps {

}

class FormStartup extends React.Component<FormStartupProps, {}> {
	render() {
		const { children } = this.props;

		return (
			<StyledFormStartup className="form-startup">
				{children}
			</StyledFormStartup>
		);
	}
}

export default FormStartup;
