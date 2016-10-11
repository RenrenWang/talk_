var express = require('express'),
	router = express.Router(),
	formidable = require('formidable'),
	db = require('../model/db.js'),
  fs=require('fs'),
  path=require('path'),
util= require('../util/Util.js');
router.get('/', function(req, res, next) {

	if(req.session.login) {
		db.find('users', {
			'username': req.session.username
		}, function(err, result) {
			res.render('index', {
				title: '首页！！！',
				'login': req.session.login ? true : false,
				'username': req.session.login ? req.session.username : '',
				'active': 'index',
				'avatar': result[0].avatar || 'default.jpg'
			});
		})
	} else {
		res.render('index', {

			'login': req.session.login ? true : false,
			'username': req.session.login ? req.session.username : '',
			'active': 'index',
			'avatar': false
		});

	}

})
router.get('/regist', function(req, res, next) {
	res.render('regist', {
		title: '注册',
		'login': req.session.login ? true : false,
		'username': req.session.login ? req.session.username : '',
		'active': 'regist'
	});

});
router.get('/person', function(req, res, next) {
	res.render('person', {
		title: '我的说说',
		'login': req.session.login ? true : false,
		'username': req.session.login ? req.session.username : '',
		'active': 'person'
	});

});

//-3   系统出错！！
//1   成功
//-   失败！！！
//注册
router.post('/doRegist', function(req, res, next) {
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		var username = fields.username;
		var password = fields.password;
		// if(username.length==0){

		// }
		var collectionName = 'users';
		var query = {
			'username': username
		};
		var collectionName = 'users';

		//console.log("username:"+username+",password:"+password);
		db.find(collectionName, query, function(err, result) {

			if(err) {

				res.send('-3');
				return;
			}
			if(result.length != 0) {
				res.send('-1');
				return;
			}

			// console.log("username:"+username+",password:"+password);

			var docs = {
				'username': username,
				'password': util.md5(password),
				'createTime': util.nowTime(),
				'avatar': 'default.jpg'
			};
			db.insertOne(collectionName, docs, function(err, result) {
				if(err) {
					res.send('-3');

					return;
				}
				req.session.login = true;
				req.session.username = username;
				res.send('1');

			})

		})
	});
});
router.get('/quit', function(req, res, next) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
			return;
		}
		res.render('login', {
			title: '这是首页！！！',
			'login': false,
			'username': '',
			'active': 'login'
		});
	})

});
//登录
router.get('/login', function(req, res, next) {
	res.render('login', {
		title: '这是首页！！！',
		'login': req.session.login ? true : false,
		'username': req.session.login ? req.session.username : '',
		'active': 'login'
	});
});
router.post('/doLogin', function(req, res, next) {
	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		var username = fields.username;
		var password = util.md5(fields.password);
		var collectionName = 'users';
		db.find(collectionName, {
			'username': username
		}, function(err, result) {
			if(err) {
				res.send('-3');
				return;
			}
			if(result.length == 0) {
				res.send('-2');
				return;
			}
			if(result[0].password == password) {
				db.update(collectionName, {
					'username': username
				}, {
					$set: {
						'lastLoginTime': util.nowTime()
					}
				}, function(err, result) {
					if(err) {
						res.send('-3');
						return;
					}
					req.session.login = true;
					req.session.username = username;
					res.send('1');
				});

			} else {
				res.send('-1');
				return;
			}

		});

	});
});
//设置头像
router.get('/setavatar',function(req,res){
	  res.render('setavatar');
});
router.post('/dosetavatar',function(req,res){
	    var form = new formidable.IncomingForm();
	    form.uploadDir =__dirname+"/../avatar/";
//	    fs.mkdir( ,function(err,result){
//	    	 if(err){
//	    	 	 console.log(err);
//	    	 	 return;
//	    	 }	
	    	// console.log(result.path);
	    	 //  
	    // console.log(  form.uploadDir);
         form.parse(req, function(err, fields, files) {
         	console.log(files.file);
         var oldPath=files.file.path;
         var newPath=__dirname+"/../avatar/"+req.session.username+path.extname(files.file.name);
            fs.rename(oldPath,newPath,function(err){
            	  if(err){
            	  	res.send('上传失败！！');
            	  	return;
            	  }
            	  	res.send('上传成功！！');
            })
           
         });
	    //})
	  
});
module.exports = router;