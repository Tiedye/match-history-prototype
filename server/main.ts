/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express from 'express';
import axios from 'axios';

const app = express();
app.use(cors({
  origin: '*'
}));
app.get('/getforward', async (req, res) => {

  axios.get(<string>req.query.url, {
    headers: req.query.headers ? JSON.parse(<string>req.query.headers) : undefined,

  }).catch(e => {
    if (e.response) {
      return e.response;
    }
    throw e;
  }).then(r => {
    res.status(r.status);
    res.send(r.data);
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Started`);
});
server.on('error', console.error);
