require('express-async-errors');
const winston = require('winston');
const tsFormat = () => (new Date().toISOString());
    
const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'errors.log',
            timestamp: tsFormat,
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
        filename: 'exceptions.log',
        timestamp: tsFormat,
            level: 'error'
    })
    ]
});
    
module.exports = {
    errorLog: errorLog,
};