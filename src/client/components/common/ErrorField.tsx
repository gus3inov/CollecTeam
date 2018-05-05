import * as React from 'react';

// type ErrorFieldProps = {
//     input: any;
//     type: string;
//     meta: any;
// }

const ErrorField: React.SFC<any> = (props) => {
    const {input, type, meta: {error, touched}} = props;
    const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>;

    return (
        <div>
            <label>{input.name}</label>
            <input {...input} type={type}/>
            {errorText}
        </div>
    );
};

export default ErrorField;