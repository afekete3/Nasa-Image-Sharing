var Account    = require('./app/models/account');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/accounts', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 8081;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening');
    next();
});

// GET request to /api returns { message: 'Hello World' }
// In my C9 account the request must be sent to https://node-angular-lgobinath.c9users.io:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});

router.route('/create') 

   .post( function(req,res){
    console.log(req.stack)
     res.json({ message: "yo"});
    });


app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port)