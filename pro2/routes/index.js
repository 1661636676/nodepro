var express = require('express');
var router = express.Router();
var async=require('async')
var mongodb=require('mongodb').MongoClient
var db_str='mongodb://localhost:27017/hangzhou'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register',(req,res)=>{
	res.render('register',{})
})
router.get('/reset',(req,res)=>{
	res.render('reset',{user:req.session.user})
})
router.get('/detail',(req,res)=>{
	res.render('detail',{user:req.session.user})
})
router.get('/relogin',(req,res)=>{
	  req.session.user=undefined
	  res.redirect('/')//重定向
})
router.get('/back',(req,res)=>{
	  req.session.data1=undefined
	  res.redirect('/billList')//重定向
})
router.get('/billList',(req,res)=>{
	console.log(req.session)
	var pageNO=req.query.pageNO
	 pageNO=pageNO?pageNO:1
	var count=0
	var page=0
	var pagesize=7
	/*var str=req.body
	console.log(str)*/
	mongodb.connect(db_str,(err,database)=>{
		database.collection('zhangdan',(err,coll)=>{
			async.series([
		  		function(callback){
		  			coll.find({}).toArray((err,data)=>{
		  				page=Math.ceil(data.length/pagesize)
//		  				console.log(page)
		  				count=data.length
		  				pageNO=pageNO<1?1:pageNO
		  				pageNO=pageNO>page?page:pageNO
		  				callback(null,'')
		  			})
		  		},function(callback){
		  			coll.find({}).sort({_id:-1}).limit(pagesize).skip((pageNO-1)*pagesize).toArray((err,data)=>{
		  				callback(null,data)
		  			})
		  			
		  		}/*,function(callback){
		  			coll.find(str).toArray((err,data)=>{
		  				callback(null,data)
		  			})
		  		}*/
		  	],function(err,data){ 

		  		
		  		res.render('billList',{user:req.session.user,data1:req.session.data1,data:data[1],page:page,pageNO:pageNO,pagesize:pagesize,count:count})
		  	})
			
			/*coll.find({}).toArray((err,data)=>{
				 res.render('billList',{user:req.session.user,data:data})
				 
			})*/
		})
	})
})
router.get('/billAdd',(req,res)=>{
	 res.render('billAdd',{user:req.session.user})
})

router.get('/check',(req,res)=>{
	 res.render('check',{user:req.session.user})
})
module.exports = router;
