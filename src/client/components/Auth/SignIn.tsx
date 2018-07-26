import * as React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';

export interface SignInProps {
    username: string;
    password: string;

    onSubmit(): any;
}

class SignIn extends React.Component<SignInProps & InjectedFormProps, {}> {
    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="auth-body__form__input">
                    <Field name="username" placeholder="Логин" component="input"/>
                </div>
                <div className="auth-body__form__input">
                    <Field name="password" placeholder="Пароль" component="input" type="password"/>
                </div>
                <div className="auth-body__form__submit">
                    <input type="submit" value="Войти"/>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'auth'
})(SignIn);
