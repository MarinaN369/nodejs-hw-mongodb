import {contactsCollection} from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find({userId});
  const contactsCount = await contactsCollection.find({userId})
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getAllContactsById = async(contactId, userId) => {
    const contact = await contactsCollection.findOne(contactId, userId);
    return contact;
};

export const createContact = async(payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const updateContact = async(contactId, userId, payload, options = {}) => {
  payload.photo = options.photo;
  try {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
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
    } catch (error) {
      console.error('Error during updateContact:', error);
      throw error;
    }
  };

    export const deleteContact = async(contactId, userId) => {
const contact = await contactsCollection.findOneAndDelete({
    _id: contactId, userId
});
return contact;
    }


