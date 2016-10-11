var MongoClient=require('mongodb').MongoClient;
var config=require('../config.js');
var test=require('assert');
function  _connectDB(callback){
	var url='mongodb://'+config.host+':'+config.port+'/'+config.db;
       MongoClient.connect(url,function(err, db) {
       
          if(err){
          	 console.log('连接失败！！');

          	 return ;
          }
           console.log('连接成功！！');
            callback(err,db);
         
       })
}
exports.insertOne=function (collectionName,docs,callback) {
	    _connectDB(function(err,db){
           db.collection(collectionName).insert(docs,function(err,result){
           	if(err){
              callback(err,null);
           		 console.log('数据插入失败！！');
                 db.close();
           		 return;
           	}
              callback(null,result);
              db.close();
           }); 

         })
}
exports.find=function(collectionName,query,c,d){
	if(arguments.length==3){
         var  callback=c;
         var skipnumber=0;
         var limit=0;
        
	}else if(arguments.length==4){
              var  callback=d;
              var    args=c;
              var skipnumber=args.pagemount*args.page||0;

               var limit=args.pagemount||0;
               var sort=args.sort||{};
	} else{
		console.log('参数有误！！！');
		return;
	}
	
        _connectDB(function(err,db){
              db.collection(collectionName).find(query).skip(skipnumber).limit(limit).sort(sort).toArray(function(err,docs){
              	   if(err){
           		        callback(err,null);
                      db.close();
           		         return;
             	}     
                //console.log(docs);
                 callback(null,docs);
                 
              })
        })   
};
exports.update=function(collectionName,selector,docs,callback){
             _connectDB(function(err,db){
                 db.collection(collectionName).update(selector,docs,function(err,result){
                       if(err){
                      callback(err,null);
                        db.close();
                       return;
                    }     
                
                   callback(null,result);

                     db.close();        
                 });
             })
}
exports.deleteMany=function(collectionName,filter,callback){
    _connectDB(function(db){
       db.collection(collectionName).deleteMany(filter,function(err,result){
                  if(err){
                       console.log('删除失败！！！');
                         db.close();
                       return;
                    }
                    callback(result); 
                      db.close();
                  
         })
      })
};


exports.count=function(collectionName,b,c){
    if(arguments.length==3){
         var query=b;
         var callback=c;
    }else if(arguments.length==2){
         var b=callback;
          var query={};
    }
      _connectDB(function(db){
           
           db.collection(collectionName).find(query).count(function(err,number){
                  if (err) {
                  console.log('数据数目获取失败！！！');
                    db.close();
                  return;
                 }
                 callback(number);
                   db.close();
           })
      })
}