const EventEmitter = require('events');
const emitter = new EventEmitter();
const logger = require('./logger')

// Register Event listener
emitter.on('messageLogged', function(arg){
    console.log('Listener called: ', arg)
})
// Raise an event
emitter.emit('messageLogged', {id: 1, url:'http://'})

emitter.on('logging', function(arg){
    logger.log(arg.data)
    console.log('Message logged')
})

emitter.emit('logging', {data: 'hello'})