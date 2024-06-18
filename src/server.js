import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env.js';
// import { getAllContacts } from './services/contacts.js';
// import {getAllContactsById} from './services/contacts.js';
import contactsRouter from './routers/contacts.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';




export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(pino());


app.use(contactsRouter);

// app.use((req, res, next) => {
//   res.status(404).json({
//     message: 'Contact not found!',
//   });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Something went wrong!',
//     error: err.message,
//   });
// });

app.use(errorHandler);
app.use('*', notFoundHandler);



      const PORT = Number(env('PORT', '3000'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });

}

