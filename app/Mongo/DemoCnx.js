const mongoose = require('mongoose');


const demoCnx = mongoose.createConnection('mongodb://localhost:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    poolSize: 20
});



const mongoRole = demoCnx.model('role', mongoose.Schema({}, {strict:false}));
//const mongoDemo = demoCnx.model('demo', {}, {autoCreate: true});

module.exports.Role = mongoRole;

// export {mongoExamen, mongoPaciente, mongoUser, mongoSede, mongoNodo};
