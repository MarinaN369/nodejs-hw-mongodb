import {contactsCollection} from '../db/models/contact.js';

export const getAllContacts = async() => {
    const contacts = await contactsCollection.find();
    return contacts;
}

export const getAllContactsById = async(contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};
