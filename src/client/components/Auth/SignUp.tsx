import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import * as emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField'

export interface SignUpProps {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    onSubmit?(): any;
}

const validate = ({email, password, repeatPassword}: any) => {
    const errors: any = {};

    if(!email) errors.email = 'email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Invalid email';

    if(password !== repeatPassword) errors.password = 'Пароли не совпадают';

    if(!password) errors.password = 'password is required';
    else if(password.length < 8) errors.password;

    return errors
};

const adaptFileEventToValue = (delegate: any) => (e: any) => delegate(e.target.files);

const FileInput = ({
                       input: { value: omitValue, onChange, onBlur, ...inputProps },
                       meta: omitMeta,
                       ...props
                   }: any) => {
    return (
        <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
        />
    );
};

@(reduxForm({
    form: 'auth',
    validate
}) as any)
class SignUp extends React.Component<SignUpProps & InjectedFormProps, {}> {

    public render() {
        const {handleSubmit} = this.props

        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Username</label>
                        <Field name="username" component="input"/>
                    </div>
                    <div>
                        <label htmlFor="">First Name</label>
                        <Field name="firstName" component="input"/>
                    </div>
                    <div>
                        <label htmlFor="">Last Name</label>
                        <Field name="lastName" component="input"/>
                    </div>
                    <div>
                        <label htmlFor="">Avatar</label>
                        <Field name="avatar" component={FileInput} type="file"/>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <Field name="email" component={ErrorField} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <Field name="password" component={ErrorField} type="password" />
                    </div>
                    <div>
                        <label htmlFor="">Repeat Password</label>
                        <Field name="repeatPassword" component={ErrorField} type="password" />
                    </div>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;