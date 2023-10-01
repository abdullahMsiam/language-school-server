const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Here is the middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fphzptz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const personsCollection = client.db('summerDb').collection('persons');
        const classesCollection = client.db('summerDb').collection('classes');
        const instructorsCollection = client.db('summerDb').collection('instructors');
        const usersCollection = client.db('summerDb').collection('users');
        const enrolsCollection = client.db('summerDb').collection('enrols');
        const blogsCollection = client.db('summerDb').collection('Blogs');

        // blogs 
        app.get('/blogs', async (req, res) => {
            const result = await blogsCollection.find().toArray();
            res.send(result);
        })

        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const selectBlog = blogs.find(blog => blog._id === id);
            res.send(selectBlog);
        })
        // classes
        app.get('/classes', async (req, res) => {
            const result = await classesCollection.find().toArray();
            res.send(result);
        })

        app.post('/classes', async (req, res) => {
            const newClass = req.body;
            const result = await classesCollection.insertOne(newClass)
            res.send(result);
        })

        // persons manage 
        app.get('/persons', async (req, res) => {
            const result = await personsCollection.find().toArray();
            res.send(result);
        })

        app.post('/persons', async (req, res) => {
            const person = req.body;
            const result = await personsCollection.insertOne(person);
            res.send(result);
            console.log(person);
        })
        // instructor
        app.get('/instructors', async (req, res) => {
            const result = await instructorsCollection.find().toArray();
            res.send(result);
        })

        // users 
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })

        //enrols 
        app.get('/enrols', async (req, res) => {
            const result = await enrolsCollection.find().toArray();
            res.send(result);
        })

        app.post('/enrols', async (req, res) => {
            const newEnrol = req.body;
            console.log(newEnrol);
            const result = await enrolsCollection.insertOne(newEnrol);
            res.send(result);

        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('summer is running')
});

app.listen(port, () => {
    console.log(`summer server port on ${port}`)
})