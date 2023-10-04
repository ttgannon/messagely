const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();

const User = require("../models/user");
const {SECRET_KEY} = require("../config");
const ExpressError = require("../expressError");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            throw new ExpressError("You must enter a username and password", 405);
        }
        const verify = await User.authenticate(username, password);
        if(!verify){
            throw new ExpressError("Incorrect username/password",404);
        }
        const token = jwt.sign({username}, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({token});
    } catch(error) {
        return next(error);
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
    try {
        const {username, password, first_name, last_name, phone} = req.body;
        if (!username || !password) {
            throw new ExpressError("You must enter a username and password", 405);
        }
        const verify = await User.register(username, password, first_name, last_name, phone);
        if(!verify){
            throw new ExpressError("Something went wrong",404);
        }
        const token = jwt.sign({username}, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({token});
    } catch(error) {
        return next(error);
    }
})