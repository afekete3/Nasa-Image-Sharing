var Account    = require('./app/models/account');
var Collection = require('./app/models/collection')
var mongoose   = require('mongoose');
var nev = require('email-verification')(mongoose);2 
mongoose.connect('mongodb://localhost:27017/accounts2', {
  useMongoClient: true,
});

mongoose.Promise = global.Promise;
var nodemailer = require('nodemailer');
var randomstring = require('randomstring');
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
var smtpTransport = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: "teb244ecelab@gmail.com",   
        pass: 'ece4436google'
    }
});
var mailOptions;
// GET request to /api returns { message: 'Hello World' }
// In my C9 account the request must be sent to https://node-angular-lgobinath.c9users.io:8081/api
router.get('/', function(req, res) {
    res.json({ message: 'Hello World' });
});

router.route('/verify') 

    .post((req, res) => {
        const {secretToken} = req.body; 

        //find the account which matches the secret token
        Account.find({secretToken : secretToken}, (err, account)=>{
            if(err){
                return res.send(err); 
            }
            if(account[0] == null){
                return res.send({message:'no user found!'}); 
            }
            
            account[0]['isActive'] = true; 
            account[0]['secretToken'] = ''; 
            
            account[0].save((err)=> {
                if(err){
                    return res.send(err); 
                }
                return res.send({message: 'verification success'}); 
            });
        }); 
    });
router.route('/create') 

    .post(function(req,res){
        
        var email = req.body.username; 
        
        if(!validator.isEmail(email) || email == ""){
            return res.send({message: "invalid email"}); 
        }
        var psw = req.body.password; 
        //encrypting the password 
        var salt = bcrypt.genSaltSync(saltRounds);  
        var hash = bcrypt.hashSync(psw, salt); 
        
        var secretToken = randomstring.generate(); 
        
        
        var newAccount = new Account({
            username : email, password: hash, secretToken : secretToken, isActive : false 
        });
        
        //if the account is already in use
        Account.find({'username':email}, function(err, account){
            if(account[0] == null){
                //if the account isnt in use make one
                newAccount.save(function(err){
                    if(err){
                        res.send(err); 
                    }
                    res.json({message: 'Account created'}); 
                     console.log('about to email')
                    mailOptions={
                        to : req.body.username,
                        subject : "Please confirm your Email account",
                        html : "Use this secretToken to verify your email: " + newAccount.secretToken
                    };
                    smtpTransport.sendMail(mailOptions, function(error, response){
                         if(error){
                            console.log(error);
                            res.end("error");
                         }else{
                            res.end("email sent");
                         }
                    });
                });
            }else{
                res.send({message: 'email already in use!'});
            }
            if(err){
                res.send(err); 
            }
        });
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
router.route('/collections')
    .get(function(req, res) {
          console.log("getting all accounts");
        Collection.find(function(err, collections) {
            if (err){
                res.send(err);
            }   
            res.json(collections);
        });
    });
router.route('/login')
    .post(function(req, res){
        if (req.body.username == "admin" && req.body.password == "admin"){
            res.json({message: 'admin mode'});
        }else{
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
        }
       
    });
router.route('/createcollection')
    .post(function(req,res){
        console.log('in create collection');
        console.log(req.body.username);
        console.log(req.body.name);
        Collection.find({'username':req.body.username,'name': req.body.name }, function(err, account){
            if(err){
               res.send(err);
            } 
             if(account[0] != null){
                 res.json({message: 'name already used please select another one'});
            }
            else{
                var collection = new Collection();
                collection.username = req.body.username;
                collection.name = req.body.name;
                collection.desc = req.body.description;
                collection.ispublic = req.body.privacy;
                collection.save(function() {
                console.log('saved account');
                res.json({ message: 'collection created!', username: req.body.name });
                });
            }
        });
    });
router.route('/collectiondata')
    .post(function(req,res){
         console.log(req.body.username);
        console.log(req.body.collectionName);
         Collection.find({'username':req.body.username,'name': req.body.collectionName }, function(err, collection){
              if(err){
               res.send(err);
            } 
            console.log(collection)
            res.json(collection);
             
         });
   
    })
    .put(function(req,res){
        Collection.find({'username':req.body.username,'name': req.body.collectionName }, function(err, collection){
           if(err){
               res.send(err);
            } 
            var index = collection[0].Collection.indexOf(req.body.deleteImage);
            if (index > -1) {
                collection[0].Collection.splice(index, 1);
            }
           collection[0].save(function() {
                console.log('saved account');
                res.json(collection);
                });
            });
        });
router.route('/collectionupdate')
    .put(function(req,res){
         Collection.find({'username':req.body.username,'name': req.body.collectionName }, function(err, collection){
           if(err){
               res.send(err);
            } 
            console.log(collection);
            collection[0].desc = req.body.description;
            collection[0].ispublic = req.body.privacy;
            collection[0].save(function() {
                console.log(collection);
                res.json(collection);
                });
         });
    })
      .post(function(req,res){
        console.log('in add to collection');
          Collection.find({'username':req.body.user,'name': req.body.name }, function(err, collection){
            if(err){
               res.send(err);
            } 
              console.log(collection);
            collection[0].Collection.push(req.body.img);
            collection[0].save(function() {
                console.log(collection);
                res.json(collection);
                });
          });
      });
router.route('/getCollections')
    .post(function(req,res){
         Collection.find({'username':req.body.username}, function(err, collection){
               if(err){
               res.send(err);
            } 
            res.json(collection); 
         });
    });

router.route('/addLike')
    .put(function(req,res){
         Collection.find({'username':req.body.usernameCollection,'name': req.body.name }, function(err, collection){
               if(err){
               res.send(err);
            } 
              var index = collection[0].rank.indexOf(req.body.usernameAccount);
            if (index > -1) {
                collection[0].rank.splice(index, 1);
            }else{
                 collection[0].rank.push(req.body.usernameAccount);
            }
            
              collection[0].save(function() {
                Collection.find(function(err, collections) {
                    if (err){
                        res.send(err);
                    }   
                    console.log(collections);
                    res.json(collections);
                });
            
            });
         });
       
    });
router.route('/deletecollection/:account_id')
    .delete(function(req,res){
        console.log( req.body)
          Collection.remove({_id: req.params.account_id}, function(err, bear) {
                if (err)
                    res.send(err);
    
                   Collection.find(function(err, collections) {
                        if (err){
                            res.send(err);
                        }   
                    
                        res.json(collections);
            });
        });
    });
router.route('/collectionname')
    .put(function(req,res){
        console.log(req.body.id);
         Collection.find({'_id':req.body.id}, function(err, collection){
            if(err){
               res.send(err);
            } 
            Collection.find({'username':req.body.username,'name': req.body.name }, function(err, account){
            if(err){
               res.send(err);
            } 
             if(account[0] != null){
                 res.json({message: 'name already used please select another one'});
            }else{
                      //console.log(collection);
                    collection[0].name = req.body.name
                    collection[0].save(function() {
                                      Collection.find(function(err, collections) {
                                if (err){
                                    res.send(err);
                                }   
                              //  console.log(collections);
                                res.json(collections);
                            });
                        });
                  
            }
         });
         });
    });
app.use('/api', router);

app.listen(port);
console.log('Server is running on port ' + port);