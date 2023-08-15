const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '447e8d08c46a1c03384585fb108869c634893b4d339beaaba04f086c10c303ce';

app.post('/gift', (req, res) => {

  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(body.proof,body.name,MERKLE_ROOT);

  res.send(isInTheList)
  
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
