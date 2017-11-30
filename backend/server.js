var Account    = require('./app/models/account');
var Collection = require('./app/models/collection')
var mongoose   = require('mongoose');
var nev = require('email-verification')(mongoose);2 
mongoose.connect('mongodb://localhost:27017/accounts1', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var validator = require('validator');
var bcrypt = require('bcrypt'); 
const saltRounds = 10;

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
       console.log(req.body)
       var account1 = new Account();      // create a new instance of the Bear model
        if (validator.isEmail(req.body.username) == false){
            console.log('bad email')
             res.json({ message: 'Invalid Username! Please try again' });
        }
        else{
            var salt = bcrypt.genSaltSync(saltRounds);  
            var hash = bcrypt.hashSync(req.body.password, salt);
            account1.username = req.body.username;
            account1.password = hash;// set the bears name (comes from the request)
            // save the bear and check for errors
           
            account1.save(function() {
            console.log('saved account')
            res.json({ message: 'Account created!' });
            });
        }
    });
router.route('/accounts')
    .get(function(req, res) {
          console.log("getting all accounts");
        Account.find(function(err, accounts) {
            if (err){
                res.send(err);
            }   
            res.json(accounts);
        });
    });
    
router.route('/login')
    .post(function(req, res){
        console.log("in the login validation");
        Account.find({'username':req.body.username}, function(err, account){
            if(err){
               res.send(err);
            }
            if(account[0] == null){
                 res.json({message: 'invalid username or password'}) 
            }
            else{
                console.log(account);
                 console.log('account');
                var valid = bcrypt.compareSync(req.body.password, account[0]['password']);
                if(valid){
                    res.json({message: 'valid password', username: req.body.username}); 
                }else{
                    res.json({message: 'invalid username or password'}); 
                }
            }
        });
       
    });
router.route('/createcollection')
    .post(function(req,res){
        console.log('in create collection');
        console.log(req.body.username);
        Collection.find({'username':req.body.username,'name': req.body.name }, function(err, account){
            if(err){
               res.send(err);
            } 
             if(account[0] != null){
                 res.json({message: 'name already used please select another one'}) 
            }
            else{
                var collection = new Collection();
                collection.username = req.body.username;
                collection.name = req.body.name;
                collection.desc = req.body.description;
                collection.save(function() {
                console.log('saved account')
                res.json({ message: 'collection created!' });
                });
            }
        })
    })

app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port)