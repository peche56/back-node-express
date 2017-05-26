var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//Moteur de template
app.set('view engine', 'ejs');

//Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'yep',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }

}));

app.use(require('./middlewares/flash'));

//Routes
app.get('/', (request, response) => {
  console.log(request.session);
    response.render('pages/index');
});
app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "tu n'as rien posté");
    }
    else {
      var Message = require('./models/comments');
      Message.create(request.body.message, function () {
        request.flash('success', "Merci :)");
      });
    }
    console.log(request.body.message);
    response.redirect('/');
});

app.listen(8080);
