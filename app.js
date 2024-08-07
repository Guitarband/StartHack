let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const QRCode = require('qrcode');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://preetishchoudhary:Nf8qAoPiEezmbDrB@starthackcluster.4tsfl13.mongodb.net/?appName=StartHackCluster";
const { auth, requiresAuth } = require('express-openid-connect');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const {
  landingRouter,
  aboutRouter,
  solutionsRouter,
  loginRouter,
  signupRouter,
  profileRouter,
  portfolioRouter,
  exploreRouter,
  settingsRouter
} = require('./routes/serverRouters')
const companyArray = require('./data/companies.json')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '0a4d6b7e7c68f9b8a7342c4c1c6fd31e',
  baseURL: 'https://start-hack-git-master-guitarbands-projects.vercel.app',
  clientID: 'WdZznteWFux0cmyLdjqJEhLGLa5SWlzt',
  issuerBaseURL: 'https://dev-pexkki148zgwoihg.au.auth0.com'
};

app.use(auth(config));
app.use('/landing', landingRouter);
app.use('/about', aboutRouter);
app.use('/solutions', solutionsRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/portfolio', portfolioRouter);
app.use('/explore', exploreRouter);
app.use('/settings', settingsRouter);


app.get('/', (req, res) => {
  if(req.oidc.isAuthenticated()){
    res.redirect('/checkUser')
  }
  else{
    res.render('landing', { title: 'Landing' })
  }
});

app.get('/checkUser', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const data = client.db('userData').collection('storedInfo')
  const username = req.oidc.user.nickname;
  try{
    await client.connect();
    const userData = await data.findOne({username: username})
    if (userData) {
      res.cookie('userData', `${userData._id.toString()}`);
      res.redirect(`/portfolio`)
    } else {
      let uid = await data.insertOne({
        email: req.oidc.user.email,
        first_name: req.oidc.user.given_name,
        last_name: req.oidc.user.family_name,
        picture: req.oidc.user.picture,
        username: username,
        money: 10000,
        investments: {}
      })
      res.cookie('userData', `${uid.insertedId.toString()}`);
      res.redirect(`/portfolio`)
    }
  } catch (error){
    console.error(error)
  }finally {
    await client.close()
  }
})

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const {username, password} = req.body
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    const userData = await data.findOne({username: username})
    if (userData) {
      if((userData.email === username || userData.username === username) && userData.password === password) {
        res.cookie('userData', `${userData._id.toString()}`);
        res.redirect(`/portfolio`)
      } else{
        res.render('login', {loginFlag: true});
      }
    } else {
      res.render('login', {loginFlag: true});
    }
  } catch (error){
    console.log('An error occurred');
  } finally {
    await client.close()
  }
})

app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const {email} = req.body
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    const userData = await data.findOne({email: email})
    if (!userData) {
      res.render('signupExtras', {email:email})
    } else {
      res.render('login', {loginFlag: true});
    }
  } catch (error){
    console.log('An error occurred');
  } finally {
    await client.close()
  }
})

app.post('/signupComplete', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const {email,dateob,fname,lname,username,password} = req.body
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    let uid = await data.insertOne({
      email:email,
      date_of_birth:dateob,
      first_name:fname,
      last_name:lname,
      username:username,
      password:password,
      money: 0,
      investments: {}
    })
    res.cookie('userData', `${uid.insertedId.toString()}`);
    res.redirect(`/portfolio`)
  } catch (error){
    console.log('An error occurred');
  } finally {
    await client.close()
  }
})

app.get('/getcookie', (req, res) => {
  const cookieValue = req.cookies.userData;
  if (cookieValue) {
    res.send(`${cookieValue}`);
  } else {
    res.send('Cookie not found');
  }
});

app.get('/user', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const data = client.db('userData').collection('storedInfo')
  try {
    const accountId = req.headers['authorization'];
    await client.connect();
    const userData = await data.findOne({_id: new ObjectId(accountId)})
    if (userData) {
      res.json({
        id: userData._id,
        username: userData.username,
        money: userData.money,
        investments: userData.investments
      })
    } else {
      res.status(401).json({error: 'User not found'})
    }
  } catch (error){
    console.log(error)
  }finally {
    await client.close()
  }
})

app.get('/view', async (req, res) => {
  const { id } = req.query;
  if( companyArray.hasOwnProperty(id) ){
    res.render('viewCompany', Object.assign({"cID":id},companyArray[id]))
  }
  else{
    res.render('viewCompany', {
      "cID": "Undefined",
      "Name": "Undefined",
      "Region": "Undefined",
      "Country": "Undefined",
      "Sector": "Undefined",
      "Industry": "Undefined",
      "ESG": "Undefined"
    })
  }
})

app.get('/buy', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const { id, amount } = req.query;
  const data = client.db('userData').collection('storedInfo')
  try {
    const accountId = req.cookies.userData;
    await client.connect();
    const userData = await data.findOne({_id: new ObjectId(accountId)})
    if(userData){
      let investments = userData.investments;
      if(investments.hasOwnProperty(id)){
        investments[id] = investments[id] + parseInt(amount)
      }else{
        investments[id] = parseInt(amount)
      }
      if((userData.money - amount) >= 0) {
        await data.updateOne(
            {_id: userData._id},
            {$set: {investments:investments}}
        )
        await data.updateOne(
            {_id: userData._id},
            {$set: {money: parseInt(userData.money) - amount}}
        )
        res.status(200).json({response:`Successfully bought ${amount} shares of ${id}`})
      }else{
        res.json({error:'Not enough money'})
      }
    }
    else{
      res.status(401).json({error:'User not found'})
    }
  } finally {
    await client.close()
  }
})

app.get('/sell', async (req, res) =>  {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const { id, amount } = req.query;
  const data = client.db('userData').collection('storedInfo')
  try {
    const accountId = req.cookies.userData;
    await client.connect();
    const userData = await data.findOne({_id: new ObjectId(accountId)})
    let investments = userData.investments;
    if(userData){
      if((investments[id] - parseInt(amount)) > 0) {
        investments[id] = investments[id] - parseInt(amount)
        await data.updateOne(
            {_id: userData._id},
            {$set: {investments:investments},}
        )
        await data.updateOne(
            {_id: userData._id},
            {$set: {money: parseInt(userData.money) + parseInt(amount)}}
        )
        res.status(200).json({response:`Successfully sold ${amount} shares of ${id}`})
      }else if((investments[id] - parseInt(amount)) === 0){
        investments.delete(id)
        await data.updateOne(
            {_id: userData._id},
            {$set: {investments}}
        )
        res.status(200).json({response:`Successfully sold ${amount} shares of ${id}`})
      }else{
        res.json({error:'Not enough money'})
      }
    }
    else{
      res.status(401).json({error:'User not found'})
    }
  } finally {
    await client.close()
  }
})

app.get('/transfer', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const { recipient } = req.query;
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    const recipientData = await data.findOne({_id: new ObjectId(recipient)})
    if(recipientData){
      res.render('transfer', {recipientId: recipient,username:recipientData.username})
    }
    else{
      res.status(401).json({error:'User not found'})
    }
  } finally {
    await client.close()
  }
})

app.post('/confirmTransfer', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  let {userId, recipientId, amount} = req.body
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    const userData = await data.findOne({_id: new ObjectId(userId)})
    const recipientData = await data.findOne({_id: new ObjectId(recipientId)})
    let newUserAmount = parseInt(userData.money) -  parseInt(amount)
    let newRecipientAmount = parseInt(recipientData.money) + parseInt(amount)

    if(newUserAmount < 0){
      res.render('transfer',{recipientId: recipientId ,username:recipientData.username, error:'Insufficient funds'})
    }else {
      await data.updateOne(
          {_id: new ObjectId(userId)},
          {$set: {money: newUserAmount}}
      )

      await data.updateOne(
          {_id: new ObjectId(recipientId)},
          {$set: {money: newRecipientAmount}}
      )
      res.render('portfolio')
    }
  } catch (error){
    console.log('An error occurred');
  } finally {
    await client.close()
  }
})

app.get('/qrcode/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const parsedUrl = new URL(req.headers['authorization'])
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`
    const qrCodeUrl = await QRCode.toDataURL(`${baseUrl}/transfer?recipient=${userId}`);
    res.json( { qrCodeUrl, shareURL:`${baseUrl}/transfer?recipient=${userId}` });
  } catch (err) {
    console.error('Error generating QR code:', err);
    res.status(500).send('Error generating QR code');
  }
});

app.get('/api/v1/company', (req, res) => {
  const { name } = req.query;
  if( name === 'all'){
    res.send(companyArray)
  }
  else{
    if( companyArray.hasOwnProperty(name) ){
      res.send(companyArray[name])
    }
  }
})

app.get('/api/v1/accounts/me', async (req,res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const data = client.db('userData').collection('storedInfo')
  try {
    await client.connect();
    const userId = req.headers['authorization'];
    if(!userId){
      return res.status(401).json({error:'Unauthorized'})
    }
    const userData = await data.findOne({_id: new ObjectId(userId)})
    console.log(userData.username)
    if (userData) {
      res.json({
        email:userData.email,
        date_of_birth:userData.date_of_birth,
        first_name:userData.first_name,
        last_name:userData.last_name,
        username:userData.username,
        money:userData.money
      })
    } else {
      res.send('User not found')
    }
  } finally {
    await client.close()
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
