import {
    getAllContacts,
    getAllContactsById,
    createContact,
    updateContact,
    deleteContact,
} from '..//services/contacts.js';
import createHttpError from 'http-errors';
import {notFoundHandler} from '../middlewares/notFoundHandler.js';


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

export const createContactController = async(req, res) => {

    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: {...contact.toObject(), __v: undefined},
    });
};

export const patchContactController = async(req, res, next) => {
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);

    if(!result) {
        next(createHttpError(notFoundHandler));
        return;
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};

export const deleteContactController = async(req, res, next) => {
const {contactId} = req.params;
const contact = await deleteContact(contactId);

if(!contact) {
    next(createHttpError(notFoundHandler));
    return;
}

res.status(204).send();
};

