import * as React from 'react';

import {StyledMenu} from './style';
import LinkMenu from '../../atoms/LinkMenu';
import ButtonToggle from '../../atoms/ButtonToggle';

export interface MenuProps {
	isOpen: boolean;

	routes: Array<IMenuRoutes>;

	toggleOpen?<A>(): A;
}

const Menu: React.StatelessComponent<MenuProps> = (props: MenuProps) => {
	const {isOpen, toggleOpen, routes} = props;
	return (
		<StyledMenu className={`alt-menu ${isOpen ? 'alt-menu_open' : 'alt-menu_closed'}`} isOpen={isOpen}>
			<ButtonToggle
				toggleOpen={toggleOpen}
				isOpen={isOpen}
			/>
			<div className="logo">
				<img src="/images/logo.png" alt=""/>
			</div>
			<nav className="alt-menu-nav">
				<ul className="alt-menu-nav__list">
					{
						routes.map((route, index) => {
							return (
								<li key={index} className="alt-menu-nav__list__item">
									<LinkMenu
										to={route.path}
										isOpen={isOpen}
										text={route.name}
										icon={route.icon}
									/>
								</li>
							);
						})
					}
				</ul>
			</nav>
		</StyledMenu>
	);
};

export default Menu;
