const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../startup/logging');
const mongoose = require('mongoose');

const auth = (req,res,next) => {
    const token = req.header('x-auth-token');
    
    if (!token) return res.status(401).send('Access denide. No token provided')
    
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')        
    }
}

const isAdmin = (req,res,next) => {
    if (!req.user.isAdmin) return res.status(403).send('Access denide');
    next()
}

const validateObjectId = (req, res, next) => {
    const validId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validId) return res.status(404).send('Id is not valid');
    next()
}

const error = (err, req, res, next) => {
    logger.errorLog.info(err.message, err)
    console.log(err.message)
    res.status(500).send('Something failed')
}
module.exports = {
    auth,
    isAdmin,
    error,
    validateObjectId
}