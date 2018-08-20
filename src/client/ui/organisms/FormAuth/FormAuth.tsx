import * as React from 'react';

import StyledFormAuth from './style';
import toggleOpen from '../../../hocs/toggleOpen';
import {Fragment} from 'react';

export interface FormAuthProps {
	isOpen?: boolean;

	componentSignIn: JSX.Element;

	componentSignUp: JSX.Element;

	toggleOpen?(): any;
}

class FormAuth extends React.Component<FormAuthProps, {}> {
	render() {
		const {isOpen, componentSignIn, componentSignUp} = this.props;

		return (
			<StyledFormAuth className="auth">
				<header className="auth-header">
					{
						isOpen
							? (
								<Fragment>
									<div className="auth-header__left auth-header__sign-in">
										<button onClick={this.props.toggleOpen}>
											<i className="mdi mdi-arrow-left"></i>
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
										<button onClick={toggleOpen}>
											<span>Вход</span>
											<i className="mdi mdi-arrow-right"></i>
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
							<a className="mdi mdi-facebook"></a>
							<a className="mdi mdi-vk"></a>
							<a className="mdi mdi-google-plus"></a>
						</div>
					</div>
				</div>
			</StyledFormAuth>
		);
	}
}

export default toggleOpen(FormAuth);
