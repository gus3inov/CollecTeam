import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import * as emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField'

export interface SignUpProps {
    email: string;
    password: string;
    onSubmit?(): any;
}

const validate = ({email, password}: SignUpProps) => {
    const errors: any = {};

    if(!email) errors.email = 'email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Invalid email';

    if(!password) errors.password = 'password is required';
    else if(password.length < 8) errors.password;

    return errors
}

class SignUp extends React.Component<SignUpProps & InjectedFormProps, {}> {
    render() {
        const {handleSubmit} = this.props

        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="email" component={ErrorField} />
                    <Field name="password" component={ErrorField} />
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'auth',
    validate
})(SignUp);