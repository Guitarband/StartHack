let express = require('express');
const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const uri = "mongodb+srv://preetishchoudhary:Nf8qAoPiEezmbDrB@starthackcluster.4tsfl13.mongodb.net/?appName=StartHackCluster";

async function addData(data){
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    const userDataBase = client.db('userData').collection('storedInfo')
    try{
        await client.connect();
        await userDataBase.insertOne(data)
    }catch (error){
        console.log('An error occurred');
    }finally {
        await client.close()
    }
}

async function getData(query){
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    const userDataBase = client.db('userData').collection('storedInfo')
    try{
        await client.connect();
        return await userDataBase.findOne(query);
    }catch (error){
        console.log('An error occurred');
    }finally {
        await client.close()
    }
}

const loginRequest = express();
loginRequest.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const userData = getData({email: email})
        if (userData !== null) {
            if((userData.email === email || userData.email === email) && userData.password === password) {
                res.redirect(`/portfolio`)
            } else{
                res.render('login', {loginFlag: true});
            }
        } else {
            res.render('login', {loginFlag: true});
        }
    } catch (error){
        console.log('An error occurred');
    }
})

const signupRequest = express();
signupRequest.post('/signupComplete', async (req, res) => {
    const {email,dateob,fname,lname,username,password} = req.body
    try {
        addData({
            email:email,
            date_birth:dateob,
            first_name:fname,
            last_name:lname,
            username:username,
            password:password,
            money: 0,
            investments: {},
        })
        res.redirect(`/portfolio`)
    } catch (error){
        console.log('An error occurred');
    }
})

module.exports = {
    loginRequest,
    signupRequest
};