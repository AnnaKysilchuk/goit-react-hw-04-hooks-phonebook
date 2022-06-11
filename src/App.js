import { useState, useEffect } from 'react';
import style from './App.module.css';
import { InputForm } from './components/inputForm/InputForm.jsx';
import { FilterForm } from './components/filterForm/FilterForm.jsx';
import { ContactsList } from './components/contactsList/ContactsList.jsx';
import * as localStorage from './services/localStorage';

const CONTACTS_KEY = 'contacts';

const App = () => {
    const [contacts, setContacts] = useState(localStorage.get(CONTACTS_KEY));
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.save(CONTACTS_KEY, contacts);
    }, [contacts]);

    const onAddContact = contact => {
        if (contacts.flatMap(contact => contact.name).includes(contact.name)) {
            alert(`${contact.name} is already in your contacts.`);
            return;
        }
        setContacts(prevState => {
            return [contact, ...prevState];
        });
    };

    const onFilterInput = event => {
        setFilter(event.currentTarget.value);
    };

    const getFilterContacts = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    const onDeleteContact = contactId => {
        setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
    };

    return (
        <div>
            <h2 className={style.title}>Phonebook</h2>
            <InputForm onSubmit={onAddContact} />
            <h2 className={style.title}>Contacts</h2>
            <FilterForm value={filter} onChange={onFilterInput} />
            <ContactsList contacts={getFilterContacts()} deleteBtn={onDeleteContact} />
        </div>
    );
};

export default App;
