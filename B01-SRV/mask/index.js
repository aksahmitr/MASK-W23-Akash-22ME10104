const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb')

const app = express();

const uri = "mongodb://127.0.0.1:27017/";

app.listen(3000,() => {
    console.log("The server is listening at port 3000")
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

const client = new MongoClient(uri);

async function run(doc) {
    try {
      const db = client.db("formData");
      const coll = db.collection("userDat");
      const result = await coll.insertOne(doc);
      console.log(`Inserted ID : ${result.insertedId}`);
    } finally {
      /*await client.close();*/
    }
  }


app.post('/form', (req, res) => {
    const formData = req.body;

    if(formData.name!='' && formData.waifu!='' && formData.aadhaar!=''){
      run(formData).catch(console.dir);
      console.log(formData);
    }

    
    res.status(200).send("Works");
})