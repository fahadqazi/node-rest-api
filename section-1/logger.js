var url = 'http://mylogger.io/log'

function log(message){
    console.log(message)
}

function logDetails(){
    console.log('exports: ', exports)
    console.log('require: ', require)
    console.log('module: ', module)
    console.log('filename: ', __filename)
    console.log('dirname: ', __dirname)
}
module.exports = {
    log: log,
    logDetails: logDetails
}