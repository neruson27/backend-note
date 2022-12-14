import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";

import mongo from './clients/mongodb';
import routes from './routes';
import authorization from './middleware/authorization';

dotenv.config();

const app = express();

mongo.connect();

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(authorization);

app.use(morgan('dev'));

app.options('*', (req, res) => {
  return res.status(200).send();
})

app.use('/note', routes.note);
app.use('/user', routes.user);

app.listen(process.env.PORT || "8080", () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;