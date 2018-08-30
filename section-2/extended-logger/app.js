const Logger = require('./logger')
const logger = new Logger

logger.on('messageLogged', function(args){
    console.log('listener called, ', args)
})

logger.log('message')