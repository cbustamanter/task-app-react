const mongoose = require('mongoose');

const URI = 'mongodb://localhost/db-reactapp-task'

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log('DB:Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;