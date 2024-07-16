import {
    getAllContacts,
    getAllContactsById,
    createContact,
    updateContact,
    deleteContact,
} from '..//services/contacts.js';
import createHttpError from 'http-errors';
// import {notFoundHandler} from '../middlewares/notFoundHandler.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';



export const getContactsController = async(req, res) => {
    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);


    const contacts = await getAllContacts(
        {page,
        perPage,
        sortBy,
        sortOrder,
        userId,
    }
    );
res.status(200).json({
        status: 200,
        message: 'Successfully found contact!',
        data: contacts,
    });
};

export const getContactByIdController= async(req, res, next) => {
    const { _id: userId } = req.user;
    const {contactId} = req.params;
    const contact = await getAllContactsById(contactId, userId);

    if(!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async(req, res, next) => {
    try {
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl = null;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }

      const contactData = { ...req.body, userId, photo: photoUrl };
    const contact = await createContact(contactData);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
} catch (error) {
    next(error);
  }
};

export const patchContactController = async(req, res, next) => {
    try {
    const { _id: userId } = req.user;
    const {contactId} = req.params;
    const photo = req.file;

    let photoUrl;
    if (photo) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const updateData = { ...req.body, photo: photoUrl };
    const result = await updateContact(contactId, userId, updateData);

    if(!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
} catch (error) {
    next(error);
  }
};

export const deleteContactController = async(req, res, next) => {
const { _id: userId } = req.user;
const {contactId} = req.params;
const contact = await deleteContact(contactId, userId);

if(!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
}

res.status(204).send();
};

