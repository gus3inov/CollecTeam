import * as React from 'react';

import StyledFormAuth from './style';
import toggleOpen, { InjectedProps } from '@client/hocs/toggleOpen';
import {Fragment} from 'react';

export interface FormAuthProps extends InjectedProps {
	componentSignIn: JSX.Element;

	componentSignUp: JSX.Element;
}

class FormAuth extends React.Component<FormAuthProps & InjectedProps, {}> {
	render() {
		const {isOpen, componentSignIn, componentSignUp, handleOpen} = this.props;

		return (
			<StyledFormAuth className="auth">
				<header className="auth-header">
					{
						isOpen
							? (
								<Fragment>
									<div className="auth-header__left auth-header__sign-in">
										<button onClick={handleOpen}>
											<i className="mdi mdi-arrow-left" />
										</button>
										<h3 className="auth-header__title">Вход</h3>
									</div>
								</Fragment>
							)
							: (
								<Fragment>
									<div className="auth-header__left">
										<h3 className="title">Регистрация</h3>
									</div>
									<div className="auth-header__right">
										<button onClick={handleOpen}>
											<span>Вход</span>
											<i className="mdi mdi-arrow-right" />
										</button>
									</div>
								</Fragment>
							)
					}
				</header>
				<div className="auth-body">
					<div className="auth-body__form">
						{
							isOpen
								? (
									componentSignIn
								)
								: (
									componentSignUp
								)
						}
					</div>
					<div className="auth-body__service">
						<h3 className="title">
							Вы так же можете войти через стороние сервисы
						</h3>
						<div className="auth-body__service__content">
							<a className="mdi mdi-facebook" />
							<a className="mdi mdi-vk" />
							<a className="mdi mdi-google-plus" />
						</div>
					</div>
				</div>
			</StyledFormAuth>
		);
	}
}

export default toggleOpen(FormAuth);
