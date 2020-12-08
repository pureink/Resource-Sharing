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
  user: 'ink',
  password: '73841959',
  database: 'resource'
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
 app.get('/api/products',(req, res) => {
      let sql = "SELECT * FROM products WHERE status = 0";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
app.get('/api/products/:pagenum',(req, res) => {
      let sql = "SELECT * FROM products WHERE status = 0 LIMIT "+(parseInt(req.params.pagenum)-1)*12+" , "+12;
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
app.get('/order/:id',(req,res)=>{
    let sql="SELECT * FROM orders WHERE id ="+ req.params.id
    console.log(sql)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})
app.get('/myorder/:id',(req,res)=>{
    let sql = "SELECT * FROM orders WHERE touser=\""+req.params.id+"\" ORDER BY time DESC" ;
console.log(sql)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})

app.get('/mysell/:id',(req,res)=>{
    let sql = "SELECT * FROM orders WHERE fromuser=\""+req.params.id+"\" ORDER BY time DESC" ;
console.log(sql)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})
app.delete('/order/:id',function(req,res){
    var id = req.body.id;
    var sql = 'DELETE FROM orders WHERE id=?'
    conn.query(sql, [id], function (err, result) {
        if (err) {
            console.log(err)
            console.log('删除数据失败');
        }
        res.send('删除数据成功') //   响应内容 增加数据成功
    });
})
app.post('/neworder',function(req,res){
    var userto = req.body.touser;
    var userfrom = req.body.fromuser;
    var time = req.body.time;
    var pid = req.body.productid;
    var pname = req.body.productname
    var sql = 'insert into orders set touser=?, fromuser=?,productid=?,productname=?,time=?,status=?'
    conn.query(sql, [userto,userfrom,pid,pname,time,0], function (err, result) {
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
    var detail = req.body.detail
    var sql = 'insert into products set id=? ,name=?, productname=?, detail=?,productimg=?, price=?, per=?, starttime=?, endtime=?,status=?'
    conn.query(sql, [id,name,productname,detail,imageurl,price,per,stime,etime,0], function (err, result) {
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
app.delete('/deletep/:id',function(req,res){
    var id = req.params.id
    var sql = 'DELETE FROM products WHERE id=?'
    conn.query(sql, [id], function (err, result) {
        if (err) {
            console.log(err)
            console.log('删除数据失败');
        }
        res.send('删除数据成功') //   响应内容 增加数据成功
    });
})
app.put('/productstatus',function(req,res){
    var id = req.body.id;
    var status = req.body.status
    var sql = `update products set status=${status} WHERE id= ${id}`
    conn.query(sql,function (err, result) {
        if (err) {
            console.log(err)
            console.log('修改数据失败');
        }
        res.send('修改数据成功')
    });
})
app.put('/orderstatus',function(req,res){
    var id = req.body.id;
    var status = req.body.status;
    var sql = `update orders set status=${status} WHERE id= ${id}`
    conn.query(sql,function (err, result) {
        if (err) {
            console.log(err)
            console.log('修改数据失败');
        }
        res.send('修改数据成功')
    });
});
app.get('/search/:id',function(req,res){
    var id = req.params.id
    var sql = `SELECT * FROM products WHERE productname LIKE '%${id}%' and status = 0;`
    let query = conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          });
})
//Server listening
app.listen(process.env.PORT || 3001,() =>{
  console.log('Server started on port 3001...');
});