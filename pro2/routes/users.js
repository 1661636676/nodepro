var express = require('express');
var router = express.Router();
var async=require('async')
var mongodb=require('mongodb').MongoClient
var db_str='mongodb://localhost:27017/hangzhou'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',(req,res)=>{
	mongodb.connect(db_str,(err,database)=>{
		var str=req.body
		var us=str.user
		database.collection('user',(err,coll)=>{
			coll.find(str).toArray((err,data)=>{
				async.waterfall([
	 		     	   function(callback){
	 		     	   	  coll.find({user:us}).toArray((err,data)=>{
		 		     	   	  	if(data.length>0){
		 		     	   	  		callback(null,'1')
		 		     	   	  	}else{
		 		     	   	  		callback(null,'2')
		 		     	   	  	}
	 		     	   	  })	 		     	   	  	
	 		     	   },
	 		     	   function(a,callback){
	 		     	   	     if(a==1){
	 		     	   	     	callback(null,'1')
	 		     	   	     }else{
		 		     	   	     	coll.insertOne(data,()=>{
										 		callback(null,'2')
										 		})
	 		     	   	     }
	 		     	   }
	 		       ],function(err,data){
	 		     		     if(data==1){
	 		     		     	  res.send('2')
	 		     		     }else{
	 		     		     	 res.send('1')
										 	database.close()
	 		     		     }
	 		     	})

			})
		})
	})
})

router.post('/login',(req,res)=>{
	   var data=req.body
	   var user1=data.user	  
	   var pass1=data.pass
	   mongodb.connect(db_str,(err,database)=>{
	   	database.collection('user',(err,coll)=>{
	   		    coll.find({'user':user1}).toArray((err,data)=>{
			  	       if(data.length==0){
			  	       	res.send('3')
			  	       }else if(data[0].pass!=pass1){
			  	       	 res.send('4')
			  	       }else{
			  	       	req.session.user=data[0].user
			  	       	res.send('2')
			  	       }
			           database.close()
					  })	   		    
	   	  })
	   })
})
router.post('/billAdd',(req,res)=>{
	  var data=req.body
	  mongodb.connect(db_str,(err,database)=>{
	  	database.collection('zhangdan',(err,coll)=>{
	  		coll.insertOne(data,()=>{
	  			  res.send('1')
	  			  database.close()
	  		})
	  	})
	  })
})
router.post('/billList',(req,res)=>{
	  var str=req.body
//	  console.log(str)
	  mongodb.connect(db_str,(err,database)=>{
	  	database.collection('zhangdan',(err,coll)=>{
	  		coll.find(str).toArray((err,data)=>{
		  				req.session.data1=data
//	  				console.log(req.session.data1)
							res.send('1')
		  				database.close()
		  	})
	  	})
	  })
})
router.post('/reset',(req,res)=>{
	var str1=req.body
	var str=str1.pass
	var newpass=str1.newpass
	mongodb.connect(db_str,(err,database)=>{
		database.collection('user',(err,coll)=>{
			coll.find({pass:str}).toArray((err,data)=>{
				   if(data.length==0){
				   	res.send('1')
				   }
				   else{
				   	coll.update({pass:str},{$set:{pass:newpass}})
				   	res.send('2')
				   }
			})
		})
	})
})
router.post('/del',(req,res)=>{
	var str=req.body
	var str1=str.price
	mongodb.connect(db_str,(err,database)=>{
		database.collection('zhangdan',(err,coll)=>{
			  coll.remove({price:str1})
			  res.send('1')
			  database.close()
		})
	})
})
router.post('/check',(req,res)=>{
	var str=req.body
	console.log(str)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('zhangdan',(err,coll)=>{
			coll.find(str).toArray((err,data)=>{
				res.send(data)
				database.close()
			})
		})
	})
})
module.exports = router;
