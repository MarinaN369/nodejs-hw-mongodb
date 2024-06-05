import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {env} from './utils/env.js';



export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(pino());

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

