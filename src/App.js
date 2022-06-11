import React, { Component } from 'react';
import style from './App.module.css';
import { InputForm } from './components/inputForm/InputForm.jsx';
import { FilterForm } from './components/filterForm/FilterForm.jsx';
import { ContactsList } from './components/contactsList/ContactsList.jsx';
import * as localStorage from './services/localStorage';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    componentDidMount() {
        const savedContacts = localStorage.get('contacts');
        if (savedContacts) {
            this.setState({ contacts: savedContacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.save('contacts', this.state.contacts);
        }
    }

    onAddContact = contact => {
        if (this.state.contacts.flatMap(contact => contact.name).includes(contact.name)) {
            alert(`${contact.name} is already in your contacts.`);
            return;
        }

        this.setState(prevState => ({
            contacts: [contact, ...prevState.contacts],
        }));
    };

    onFilterInput = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getFilterContacts = () => {
        return this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        );
    };

    onDeleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }));
    };

    render() {
        return (
            <div>
                <h2 className={style.title}>Phonebook</h2>
                <InputForm onSubmit={this.onAddContact} />
                <h2 className={style.title}>Contacts</h2>
                <FilterForm value={this.state.filter} onChange={this.onFilterInput} />
                <ContactsList
                    contacts={this.getFilterContacts()}
                    deleteBtn={this.onDeleteContact}
                />
            </div>
        );
    }
}

export default App;
