import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env.js';
import { getAllContacts } from './services/contacts.js';
import {getAllContactsById} from './services/contacts.js';
import mongoose from 'mongoose';



export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(pino());

    app.get('/contacts', async(req, res) => {
      const contacts = await getAllContacts();

    res.status(200).json({
      status: res.statusCode,
      message: 'Successfully found contacts!',
      data: contacts,
    });
    });

      app.get('/contacts/:contactId', async(req, res) => {
        const {contactId} = req.params;


      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({
          status: 404,
          message: 'Invalid Id format',
        });
      }
try {
  const contact = await getAllContactsById(contactId);

if(!contact) {return res.status(404).json({
  status: 404,
  message:'Not found',
});}

res.status(200).json({
  status: res.statusCode,
  message: 'Successfully found contact with id ${contactId}',
  data: contact,
});
}
catch(error){
  res.status(500).json({
    status: 500,
    message: 'Server error',
    error: error.message,
  });
}
})

      app.use((req, res) => {
        res.status(404).json({
          message: 'Not found',
        });
      });

      const PORT = Number(env('PORT', '3000'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });

}

