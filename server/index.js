const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const db = require('./db')
const path = require('path')
const port = process.env.PORT || 3000; 
module.exports = app


app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || '500 server error');
});

db.sync() 
  .then(function(){
    app.listen(port, function () {
        console.log(`Server listening on port ${port}`)
    })
  })