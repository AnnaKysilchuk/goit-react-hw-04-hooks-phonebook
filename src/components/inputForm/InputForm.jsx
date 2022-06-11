import PropTypes from 'prop-types';
import { useState } from 'react';
import style from './InputForm.module.css';
import { nanoid } from 'nanoid';

export const InputForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({
            name: name,
            number: number,
            id: nanoid(),
        });

        reset();
    };

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        if (name === 'name') {
            setName(value);
        }
        if (name === 'number') {
            setNumber(value);
        }
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={style.inputForm} onSubmit={handleSubmit}>
            <label className={style.label} htmlFor={nameInputId}>
                Name
                <br />
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    className={style.inputArea}
                    value={name}
                    id={nameInputId}
                    onChange={handleChange}
                />
            </label>
            <label className={style.label} htmlFor={numberInputId}>
                Number
                <br />
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    className={style.inputArea}
                    value={number}
                    id={numberInputId}
                    onChange={handleChange}
                />
            </label>
            <button type="submit" className={style.addContactBtn}>
                Add contact
            </button>
        </form>
    );
};

InputForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
