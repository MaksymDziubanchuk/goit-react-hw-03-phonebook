import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import contacts from 'Data/contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from 'components/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    const isInclude = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (isInclude) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const searchContact = filter.toLowerCase();
    const filteredContacts = contacts
      .filter(contact => contact.name.toLowerCase().includes(searchContact))
      .sort((firstContact, secondContact) =>
        firstContact.name.localeCompare(secondContact.name)
      );

    return (
      <div className={css.thumb}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
