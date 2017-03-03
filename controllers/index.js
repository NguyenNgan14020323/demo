 var express = require('express');
 var router = express.Router();
 var models = require('../models/schema');
 var mongoose = require("mongoose");
 var mongo = require('mongodb').MongoClient;
 var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

 var url =  'mongodb://localhost:27017/study';

// router.route('/')
// .get(function(req,res){
//   models.User.find()
//   .exec(function(error,users){
//     if(error){
//       res.json({message:'error'});
//     }else{
//       models.User.count({},function(err,counter){
//         res.json({total:counter,data:users});
//       })
//     }
//   })
// })
// .delete(function(req,res){
//   models.User.remove({},function(err){
//     if(err){
//       res.json({message:'error'})
//     }else{
//       res.json({message:'Deleted'})
//     }
//   })
// })
// .put(function(req,res){
//   models.User.findById({"_id":ObjectID(req.body.id)},function(error,user){
  
//     if(error) res.json({message:'error'});
//     user.name = req.body.name,
//     user.email= req.body.email,
//     user.password = req.body.password

//     user.save(function(err){
//       if(err) res.json({message:'error'})
//       res.json({message:'ok'})
//     })
//   })
// })
// .put(function(req,res){
//   models.User.findById(req.body.id,function(error,user){
//     if(error) {
//       res.json({message:error})
//     }else{
//         var newUser ={
//         name    : req.body.name,
//         email     : req.body.email,
//         password  : req.body.password
//       };
//       var id = req.body.id;
//       mongo.connect(url,function(err,db){
//         assert.equal(null,err);
//           db.collection('users').updateOne({"_id":ObjectID(id)},{$set:newUser},function(error,result){
//         assert.equal(null,err);
//         res.send('thanh cong');
//         db.close();
//       });
//   });  
//   }
//   })


router.post('/',function(req,res){
  var newUser = new models.User({
    name 		: req.body.name,
    email 		: req.body.email,
    password 	: req.body.password
  })
  newUser.save(function(error){
    if (error) console.log(error);
    else res.redirect("/");
  })
});

router.post('/update',function(req,res){
  var newUser ={
    name    : req.body.name,
    email     : req.body.email,
    password  : req.body.password
  };
  var id = req.body.id;
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
      db.collection('users').updateOne({"_id":ObjectID(id)},{$set:newUser},function(error,result){
    assert.equal(null,err);
    res.send('thanh cong');
    db.close();
  });
  });

});

router.post('/delete',function(req,res){
  var id = req.body.id;
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
      db.collection('users').deleteOne({"_id":ObjectID(id)},function(error,result){
    assert.equal(null,err);
    res.send('thanh cong');
    db.close();
  });
  });
});



 module.exports = router;
