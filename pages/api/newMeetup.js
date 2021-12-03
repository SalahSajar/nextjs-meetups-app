const { MongoClient } = require('mongodb');

async function handler (req , res) {
    
    const uri = "mongodb+srv://SalahSajar:Vampiresalah@cluster0.lp6l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    
    if(req.method === "POST"){
        const data = req.body;

        console.log(req.method);
    
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
        // specify the DB's name
        const db = client.db("meetupsDB");
    
        // execute find query
        await db.collection('meetups').insertOne(data);
    
        // close connection
        client.close();
        
        res.status(201).json({message:"meet up been added successfully"});

    } else {
        // const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
        // // specify the DB's name
        // const db = client.db("meetupsDB");
    
        // // execute find query
        // await db.collection('meetups').insertOne(data);
    
        // // close connection
        // client.close();
    }
}

export default handler;