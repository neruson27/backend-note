import mongoose from 'mongoose';

import config from '../config';

let connection;

/** 
 * Function that connect mongoose with mongodb
 * require to mongoUrl has configured in the .env file.
*/
const connect = () => {
  if (connection) return connection;

  return mongoose.connect(config.mongoUrl, {useUnifiedTopology: true,useNewUrlParser: true})
    .then(con => {
      connection = con;
      console.log('Sucess db connection');
    })
    .catch(err => console.error(err))
}

export default {
  connection,
  connect
}