let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

let landingRouter = require('./routes/landing');
let aboutRouter = require('./routes/about');
let solutionsRouter = require('./routes/solutions');
let loginRouter = require('./routes/login');
let signupRouter = require('./routes/signup');

let portfolioRouter = require('./routes/portfolio');
let exploreRouter = require('./routes/explore');
let settingsRouter = require('./routes/settings');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', landingRouter);

app.use('/about', aboutRouter);
app.use('/solutions', solutionsRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.use('/portfolio', portfolioRouter);
app.use('/explore', exploreRouter);
app.use('/settings', settingsRouter);

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
    const userData = await data.findOne({username: username})
    if (userData !== null) {
      if(userData.username === username && userData.password === password) {
        res.cookie('userData', `${username}:${password}`);
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

app.post('/signup', async (req, res) => {
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
    const userData = await data.findOne({username: username})
    if (userData === null) {
      await addUser(data, username, password)
      res.redirect(`/portfolio`)
    } else {
      res.render('login', {loginFlag: true});
    }
  } catch (error){
    console.log('An error occurred');
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

async function addUser(data,username,password){
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  try {
    let userInfo = {
      username:username,
      password:password,
      money:0,
      investments:{}
    }
    const result = await data.insertOne(userInfo)
    console.log(result.insertedId)
  }finally {
    await client.close()
  }
}


module.exports = app;
