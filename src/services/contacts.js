import {contactsCollection} from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async() => {
    const contacts = await contactsCollection.find();
    return contacts;
}

export const getAllContactsById = async(contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};

export const createContact = async(payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const updateContact = async(contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
          new: true,
          includeResultMetadata: true,
          ...options,
        },
      );

      if (!rawResult || !rawResult.value) return null;

      return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
      };
    };

    export const deleteContact = async(contactId) => {
const contact = await contactsCollection.findOneAndDelete({
    __id: contactId
});
return contact;
    }


