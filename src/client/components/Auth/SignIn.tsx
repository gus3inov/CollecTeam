import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form'

export interface SignInProps {
    username: string;
    password: string;
    onSubmit(): any;
}

class SignIn extends React.Component<SignInProps & InjectedFormProps, {}> {
    render() {
        const {handleSubmit} = this.props

        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Username</label>
                        <Field name="username" component="input" />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <Field name="password" component="input" type="password" />
                    </div>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'auth'
})(SignIn);
