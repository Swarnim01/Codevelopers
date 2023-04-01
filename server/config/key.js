if(process.env.NODE_ENV === 'PRODUCTION'){
    module.exports = require('./prod');
}else if(process.env.NODE_ENV === 'LOCAL'){
    module.exports = require('./local');
}
else{
    module.exports = require('./dev');
}