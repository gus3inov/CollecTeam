import * as React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import * as emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

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

	if (!email) {
		errors.email = 'email is required';
	} else if (!emailValidator.validate(email)) {
		errors.email = 'Неккоретно веденная почта';
	}

	if (password !== repeatPassword) {
		errors.password = 'Пароли не совпадают';
	}

	if (!password) {
		errors.password = 'password is required';
	} else if (password.length < 8) {
		errors.password = 'Пароль должен быть больше 8 символов';
	}

	return errors;
};

class SignUp extends React.Component<SignUpProps & InjectedFormProps, {}> {
	render() {
		const {handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit}>
				<div className="auth-body__form__input">
					<Field name="username" placeholder="Логин" component="input"/>
				</div>
				<div className="auth-body__form__input">
					<Field name="firstName" placeholder="Имя" component="input"/>
				</div>
				<div className="auth-body__form__input">
					<Field name="lastName" placeholder="Фамилия" component="input"/>
				</div>
				<div className="auth-body__form__input">
					<Field name="email" placeholder="Почта (E-Mail)" component={ErrorField}/>
				</div>
				<div className="auth-body__form__input">
					<Field name="password" placeholder="Пароль" component={ErrorField} type="password"/>
				</div>
				<div className="auth-body__form__input">
					<Field name="repeatPassword" placeholder="Повторите пароль" component={ErrorField} type="password"/>
				</div>
				<div className="auth-body__form__submit">
					<input type="submit" value="Зарегестрироваться"/>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'auth',
	validate,
})(SignUp);
