let express = require('express');

let landingRouter = express.Router();
landingRouter.get('/', function(req, res, next) {
    res.render('landing', { title: 'ProjectName' });
});

let aboutRouter = express.Router();
aboutRouter.get('/', function(req, res, next) {
    res.render('about', { title: 'About' });
});

let solutionsRouter = express.Router();
solutionsRouter.get('/', function(req, res, next) {
    res.render('solutions', { title: 'Solutions' });
});

let loginRouter = express.Router();
loginRouter.get('/', function(req, res, next) {
    res.render('login', { loginFlag: false });
});

let signupRouter = express.Router();
signupRouter.get('/', function(req, res, next) {
    res.render('signup', { loginFlag: false });
});

let profileRouter = express.Router();
profileRouter.get('/', function(req, res, next) {
    res.render('profile', { username: 'username' });
});

let portfolioRouter = express.Router();
portfolioRouter.get('/', function(req, res, next) {
    res.render('portfolio', { username: 'username' });
});

let exploreRouter = express.Router();
exploreRouter.get('/', function(req, res, next) {
    res.render('explore', { username: 'username' });
});

let settingsRouter = express.Router();
settingsRouter.get('/', function(req, res, next) {
    res.render('settings', { title: 'Settings' });
});

module.exports = {
    landingRouter,
    aboutRouter,
    solutionsRouter,
    loginRouter,
    signupRouter,
    profileRouter,
    portfolioRouter,
    exploreRouter,
    settingsRouter
};
