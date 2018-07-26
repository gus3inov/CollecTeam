import * as React from 'react';
import FormStartup from '../../ui/organisms/FormStartup/index';
import TextField from '@material-ui/core/TextField';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import * as emailValidator from 'email-validator';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Downshift from 'downshift';
import MenuItem from '@material-ui/core/MenuItem';

export interface AddStartupProps {

}

const suggestions = [
    {label: 'Дизайн'},
    {label: 'Маркетинг'},
    {label: 'Автоматизация'},
    {label: 'Разработка'},
    {label: 'Машинное обучение'},
    {label: 'Робото-техника'},
    {label: 'Медецина'},
    {label: 'Образование'},
];

const renderTextField = ({input, label, meta: {touched, error}, ...custom},) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

function renderInput(inputProps) {
    const {InputProps, classes, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function getSuggestions(inputValue) {
    let count = 0;

    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

const validate = ({email, password, repeatPassword}: any) => {
    const errors: any = {};

    if (!email) errors.email = 'email is required';
    else if (!emailValidator.validate(email)) errors.email = 'Неккоретно веденная почта';

    if (password !== repeatPassword) errors.password = 'Пароли не совпадают';

    if (!password) errors.password = 'password is required';
    else if (password.length < 8) errors.password;

    return errors;
};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        color: '#fff'
    },
    stepRoot: {
        backgroundColor: 'transparent'
    },
    stepLabel: {
        color: '#fff'
    },
    actionsContainer: {
        marginTop: 30
    }
});

@reduxForm({
    form: 'startup',
    validate
})
@withStyles(styles)
class AddStartup extends React.Component<AddStartupProps, any> {

    state = {
        activeStep: 0,
        inputValue: '',
        selectedItem: [],
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleKeyDown = event => {
        const {inputValue, selectedItem} = this.state;
        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1),
            });
        }
    };

    handleInputChange = event => {
        this.setState({inputValue: event.target.value});
    };

    handleChange = item => {
        let {selectedItem} = this.state;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: '',
            selectedItem,
        });
    };

    handleDelete = item => () => {
        const selectedItem = [...this.state.selectedItem];
        selectedItem.splice(selectedItem.indexOf(item), 1);

        this.setState({selectedItem});
    };

    getSteps = () => {
        return [
            'Введите название платформы',
            'Специализация стартапа',
            'Дайте описание стартапа',
            'Кто нужен ?',
            'Выгода принимающего участие',
            'Контакты'
        ];
    };

    getStepContent = step => {
        const {classes} = this.props;
        const {inputValue, selectedItem} = this.state;

        switch (step) {
            case 0:
                return <Field
                    fullWidth
                    name="name"
                    component={renderTextField}
                    label="Название"
                    placeholder="Название"
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                />;
            case 1:
                return (
                    <div>
                        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
                            {({
                                  getInputProps,
                                  getItemProps,
                                  isOpen,
                                  inputValue: inputValue2,
                                  selectedItem: selectedItem2,
                                  highlightedIndex,
                              }) => (
                                <div className={classes.container}>
                                    {renderInput({
                                        classes,
                                        name: 'specialization',
                                        InputProps: getInputProps({
                                            startAdornment: selectedItem.map(item => (
                                                <Chip
                                                    key={item}
                                                    tabIndex={-1}
                                                    label={item}
                                                    className={classes.chip}
                                                    onDelete={this.handleDelete(item)}
                                                />
                                            )),
                                            onChange: this.handleInputChange,
                                            onKeyDown: this.handleKeyDown,
                                            placeholder: 'Специализации',
                                            id: 'integration-downshift-multiple',
                                        }),
                                    })}
                                    {isOpen ? (
                                        <Paper className={classes.paper} square>
                                            {getSuggestions(inputValue2).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({item: suggestion.label}),
                                                    highlightedIndex,
                                                    selectedItem: selectedItem2,
                                                }),
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            )}
                        </Downshift>
                    </div>
                );
            case 2:
                return <Field
                    fullWidth
                    name="description"
                    component={renderTextField}
                    label="Описание стартапа"
                    placeholder="Описание"
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    multiline
                    rows="4"
                />;
            case 3:
                return <Field
                    fullWidth
                    name="whoNeed"
                    component={renderTextField}
                    label="Кто нужен в стартапе ?"
                    placeholder="Кто нужен ?"
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    multiline
                    rows="4"
                />;
            case 4:
                return <Field
                    fullWidth
                    name="profitText"
                    component={renderTextField}
                    label="Profit"
                    placeholder="Profit"
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    multiline
                    rows="4"
                />;
            case 5:
                return <Field
                    fullWidth
                    name="contacts"
                    component={renderTextField}
                    label="Контакты"
                    placeholder="Контакты"
                    className={classes.textField}
                    InputProps={{
                        className: classes.input
                    }}
                    multiline
                    rows="4"
                />;
            default:
                return 'Unknown step';
        }
    };

    render() {
        const {classes, handleSubmit } = this.props;
        const steps = this.getSteps();
        const {activeStep} = this.state;

        return (
            <FormStartup>
                <form onSubmit={handleSubmit} action="">
                    <Stepper className={classes.stepRoot} activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}>
                                    <StepLabel style={{color: '#fff'}} className={classes.stepLabel}>{label}</StepLabel>
                                    <StepContent>
                                        {this.getStepContent(index)}
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <Button
                                                    disabled={activeStep === 0}
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                    color="primary"
                                                    variant="raised"
                                                    style={{marginRight: 30}}
                                                >
                                                    Назад
                                                </Button>
                                                <Button
                                                    variant="raised"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                    type={activeStep === steps.length ? 'submit' : ''}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Создать' : 'Дальше'}
                                                </Button>
                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                </form>
            </FormStartup>
        );
    }
}

export default AddStartup;
