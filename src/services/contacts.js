import {contactsCollection} from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';
import mongoose from 'mongoose';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();
  const contactsCount = await contactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getAllContactsById = async(contactId) => {
  try {if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return null;
  }
    const contact = await contactsCollection.findById(contactId);
    return contact;
}
catch (error) {
  console.error('Error getting contact by ID', error);
  throw error;
}
};

export const createContact = async(payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const updateContact = async(contactId, payload, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw new Error('Invalid contact ID');
  }
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
      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw new Error('Invalid contact ID');
      }
const contact = await contactsCollection.findOneAndDelete({
    _id: contactId
});
return contact;
    }


