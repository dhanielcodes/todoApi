const express = require("express");
const mongodb = require('mongodb')
const cors = require('cors')
const { responseBody } = require('./handleResponse')
let db;

const app = express()

/* const whitelist = ['http://127.0.0.1:5501']; // assuming front-end application is running on localhost port 3000

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === 'localhost:5034') {
      callback(null, true)
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log(origin)
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
} 
  
app.use(cors(corsOptions));
*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const uri = 'mongodb+srv://adekoyadaniel53:jrf62sOJKLE0u1h7@cluster0.polcmk8.mongodb.net/Nodeapp?retryWrites=true&w=majority&appName=Cluster0'


const connectDb = async () => {
  const client = new mongodb.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await client.connect()
  db = client.db().collection('pets')
  app.listen(5034)

}
connectDb()
// Define the CORS options


const start = async (req, res) => {
  res.send('Welcome to my api')
}

const home = async (req, res) => {
  const list = await db.find().toArray()
  res.status(200).send(responseBody(list))
}
const createItem = async (req, res) => {
  if (req.body.name) {
    const insertedPost = await db.insertOne(req.body)
    const find = await db.findOne({ _id: insertedPost.insertedId })
    res.status(200).send({ msg: 'item Created', data: find });
  } else {
    res.status(400).send({ error: 'Name is required' });
  }


  //res.status(200).send({ msg: 'item added!', data: req.body.name })

  console.log(req.body.name)
}
const updateItem = async (req, res) => {
  await db.findOneAndUpdate({ _id: new mongodb.ObjectId(req.body.id) }, { $set: { name: req.body.name } })
  res.status(200).send({ data: req.body.name })
}

const deleteItem = async (req, res) => {
  await db.findOneAndDelete({ name: req.body.name })
  res.status(200).send({ data: 'Item Deleted!' })
}





app.get('/', start)
app.get('/get-list', home)
app.post('/create-item', createItem)
app.get('/create-item', createItem)
app.post('/update-item', updateItem)
app.post('/delete-item', deleteItem)

app.get('*', (req, res) => {
  res.status(404).send({ data: 'Endpoint not found' });
})

app.post('*', (req, res) => {
  res.status(404).send({ data: 'Endpoint not found' });
})