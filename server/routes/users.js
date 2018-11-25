var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require("./connect")

// router.get('/',(req,res) => {
  // res.send("这是后端路由")
// })
// 账号管理路由
router.post('/addmember',(req,res) => {
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 接收参数
  let { username,usergrade,userintegral,discount,userstate,tel,landlinenumber} = req.body;

  console.log(username,usergrade,userintegral,discount,userstate,tel,landlinenumber )
  // 构造插入数据库的sql语句
  const  sqlStr = `insert into member(username,usergrade,userintegral,discount,userstate,tel,landlinenumber) values (?,?,?,?,?,?,?)`;

  // 参数列表
  const sqlParams = [username,usergrade,userintegral,discount,userstate,tel,landlinenumber];
  // 执行sql语句
  connection.query(sqlStr,sqlParams,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({"rstCode":1,"msg":"添加账号成功"})
      }else{
        res.send({"rstCode":0,"msg":"添加账号失败"})
      }
    }
  })
  // res.send("1111")
})
module.exports = router;
