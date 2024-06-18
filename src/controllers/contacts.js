import {getAllContacts, getAllContactsById} from '..//services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async(req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
        message: 'Successfully found contact!',
        data: contacts,
    });
}

export const getContactByIdController= async(req, res, next) => {
    const {contactId} = req.params;
    const contact = await getAllContactsById(contactId);

    if(!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};
