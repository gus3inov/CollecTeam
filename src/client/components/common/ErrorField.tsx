import * as React from 'react';
import {Fragment} from 'react';

// type ErrorFieldProps = {
//     input: any;
//     type: string;
//     meta: any;
// }

const ErrorField: React.SFC<any> = (props) => {
	const {input, type, meta: {error, touched}} = props;
	const errorText = touched && error && <div className="error-field">{error}</div>;

	return (
		<Fragment>
			<input placeholder={props.placeholder} {...input} type={type}/>
			{errorText}
		</Fragment>
	);
};

export default ErrorField;
