import PropTypes from 'prop-types';
import { ContactsListItem } from './contactsListItem/ContactsListItem';

export const ContactsList = ({ contacts, deleteBtn }) => {
    return (
        <div>
            <ul>
                {contacts.map(({ id, name, number }) => (
                    <ContactsListItem
                        key={id}
                        name={name}
                        number={number}
                        id={id}
                        deleteBtn={deleteBtn}
                    />
                ))}
            </ul>
        </div>
    );
};

ContactsList.propTypes = {
    deleteBtn: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            number: PropTypes.string,
            id: PropTypes.string,
        }),
    ),
};
