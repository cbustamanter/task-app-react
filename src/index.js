const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//midlewares
app.use(morgan('dev'));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/tasks', require('./routes/task.routes'));

//initialize server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});