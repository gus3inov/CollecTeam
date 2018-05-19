import * as React from 'react';

type ButtonToggleProps = {
    isOpen: boolean;
    toggleOpen(): void;
}
const ButtonToggle: React.SFC<ButtonToggleProps> = (props) => {
    const { isOpen, toggleOpen } = props;
    return (
        <button className={`toggle-button ${isOpen ? 'toggle-button_open' : 'toggle-button_close'}`} onClick={ toggleOpen }>
            <div className="icon toggle">
                <i></i><i></i><i></i>
            </div>
        </button>
    )
};

export default ButtonToggle;