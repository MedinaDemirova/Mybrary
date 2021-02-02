const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require ('./routes/index');
const authorRouter = require ('./routes/authors')
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');

app.set('layout', 'layouts/layout');

app.use(expressLayouts);

mongoose.connect('mongodb://localhost:27017/mybrary', {useNewUrlParser:true,useUnifiedTopology: true  });
app.use (bodyParser.urlencoded({extended:false}));


const db = mongoose.connection;
db.on ('error', error =>console.error(error));
db.once ('open', () =>console.error('Connected to DB...'));

app.use('/', indexRouter);
app.use ('/authors', authorRouter);

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);