const express = require('express');
const bodyParser = require('body-parser');
var querystring = require("querystring");
const app = express();
var cors = require('cors')
const mysql = require('mysql');
// parse application/json
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));
//create database connection
const conn = mysql.createConnection({
  host: '47.94.194.104',
  user: 'csgo',
  password: '73841959',
  database: 'csgo'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
app.get('/', function getState(req,res,next){
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.sendFile('index.html')
})
app.get('/api/user/:id',(req, res) => {
      let sql = "SELECT * FROM products WHERE name=\""+req.params.id+"\"" ;
    console.log(sql)
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
 app.get('/api/product',(req, res) => {
      let sql = "SELECT * FROM products";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
app.get('/api/product/:id',(req, res) => {
  let sql = "SELECT * FROM products WHERE id=\""+req.params.id+"\"" ;
console.log(sql)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
app.post('/neworder',function(req,res){
    var id = req.body.id;//即productid
    var userto = req.body.userto;
    var userfrom = req.body.userfrom;
    var sql = 'insert into orders set id=? ,userto=?, userfrom=?,state=0 '
    conn.query(sql, [id,userto,userfrom], function (err, result) {
        if (err) {
            console.log(err)
            console.log('新增数据失败');
        }
        res.send('增加数据成功') //   响应内容 增加数据成功
    });
});
app.post('/add',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var per = req.body.per;
    var productname = req.body.productname;
    var price = req.body.price;
    var imageurl = req.body.image;
    var stime = req.body.dateFrom;
    var etime = req.body.dateTo;
    var sql = 'insert into products set id=? ,name=?, productname=?, productimg=?, price=?, per=?, starttime=?, endtime=?'
    conn.query(sql, [id,name,productname,imageurl,price,per,stime,etime], function (err, result) {
        if (err) {
            console.log(err)
            console.log('新增数据失败');
        }
        res.send('增加数据成功') //   响应内容 增加数据成功
    });
});
app.put('/change',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var per = req.body.per;
    var productname = req.body.productname;
    var price = req.body.price;
    var imageurl = req.body.image;
    var stime = req.body.dateFrom;
    var etime = req.body.dateTo;
    var sql = 'update products set name=?, productname=?, productimg=?, price=?, per=?, starttime=?, endtime=? WHERE id=\"'+id+"\""
    conn.query(sql, [name,productname,imageurl,price,per,stime,etime], function (err, result) {
        if (err) {
            console.log(err)
            console.log('修改数据失败');
        }
        res.send('修改数据成功') //   响应内容 增加数据成功
    });
});
//Server listening
app.listen(process.env.PORT || 3001,() =>{
  console.log('Server started on port 3001...');
});
