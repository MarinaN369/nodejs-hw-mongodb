import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env.js';
// import contactsRouter from './routers/contacts.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';





export const setupServer = () => {
    const app = express();
    const PORT = Number(env('PORT', '3001'));

    app.use(express.json());
    app.use(cors());
    app.use(pino());


    app.use((req, res, next) => {console.log(`Time: ${new Date().toLocaleString()}`);
    next();
});

app.use(cookieParser());

app.get('/', (req,res) => {
  res.json({
    message: 'Hello!',
  })
});

app.use(router);
app.use(errorHandler);
app.use('*', notFoundHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });

}

