import { useEffect, useState } from 'react';
import initialContacts from '../data/contacts.json';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import Notification from './Notification/Notification';

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="main">
      <h1>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <SearchBox value={filter} onFilter={setFilter} />

      {contacts?.length ? (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
