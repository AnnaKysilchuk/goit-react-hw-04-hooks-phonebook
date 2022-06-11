import PropTypes from 'prop-types';
import React, { Component } from 'react';
import style from './InputForm.module.css';
import { nanoid } from 'nanoid';

export class InputForm extends Component {
    state = {
        name: '',
        number: '',
    };

    nameInputId = nanoid();
    numberInputId = nanoid();

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            ...this.state,
            id: nanoid(),
        });
        // this.addContact(this.state.contacts)
        this.reset();
    };

    render() {
        return (
            <form className={style.inputForm} onSubmit={this.handleSubmit}>
                <label className={style.label} htmlFor={this.nameInputId}>
                    Name
                    <br />
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        className={style.inputArea}
                        value={this.state.name}
                        id={this.nameInputId}
                        onChange={this.handleChange}
                    />
                </label>
                <label className={style.label} htmlFor={this.numberInputId}>
                    Number
                    <br />
                    <input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        className={style.inputArea}
                        value={this.state.number}
                        id={this.numberInputId}
                        onChange={this.handleChange}
                    />
                </label>
                <button type="submit" className={style.addContactBtn}>
                    Add contact
                </button>
            </form>
        );
    }
}

InputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
