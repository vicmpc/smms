var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require("./connect")

// 设置多个响应头
router.all('*', (req, res, next) => {
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  // 设置允许设置cookie
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // 给其他路由放行
  next();
})

// 账号管理路由
router.post('/addmember',(req,res) => {
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
})

// 接受会员账号列表请求
router.get('/memberlist',(req,res) => {
  
  // 构造sql查询所有用户账号数据
  const sqlStr = "select * from member order by cardid desc"

  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      res.send(data)
    }
  })
})


//  接收单条删除的请求 /delmember
 
router.get('/delmember', (req, res) => {
  // 接收cardid
  let { cardid } = req.query
  // 构造sql 根据接收到的cardid 删除这一条数据
  const sqlStr = `delete from member where cardid = ${cardid}`

  // 执行sql语句（单条删除操作）
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err
    } else {
      // 根据结果判断 如果受影响行数 > 0 就是删除成功
      if (data.affectedRows > 0) {
        // 返回删除成功的信息给前端
        res.send({"rstCode": 1, "msg":"删除成功"})
      } else {
        // 否则就是删除失败 返回删除失败的信息给前端
        res.send({"rstCode": 0, "msg":"删除失败"})
      }
    }
  })
  
})


// 接收修改用户请求 - 数据回显 /editmember
 
router.get('/editmember', (req, res) => {
  // 接收需要修改的数据的id
  let { cardid } = req.query;

  // 构造sql语句
  const sqlStr = `select * from member where cardid=${cardid}`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
})

// 批量删除请求路由 /batchdel
router.post('/batchdel', (req, res) => {
  // 接收前端传过来的需要批量删除的id数组
  let { idArr } = req.body;
  // 把字符串类型数据转为数组
  idArr = JSON.parse(idArr);

  // 构造sql语句 执行批量删除
  const sqlStr = `delete from member where cardid in (${idArr})`;
  // 执行sql语句 
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // 如果受影响行数 大于 0 就是删除成功 返回删除成功的信息给前端
      if (data.affectedRows > 0) {
        res.send({"rstCode":1, "msg":"批量删除成功"})
      } else {
        // 否则就是失败 返回失败的信息给前端
        res.send({"rstCode":0, "msg":"批量删除失败"})
      }
    }
  })
})

// 
router.post('/saveedit',(req,res) => {
  // 接收新的数据和原来的cardid
  let {username,usergrade,userintegral,userstate,discount,tel,landlinenumber,editId} = req.body;
  // 构造sql语句
  const sqlStr = `update member set username='${username}',usergrade='${usergrade}',userintegral='${userintegral}',userstate='${userstate}',discount='${discount}',tel='${tel}',landlinenumber='${landlinenumber}'where cardid='${editId}'`

  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({"rstCode":1,"msg":"修改成功"})
      }else{
        res.send({"rstCode":0,"msg":"修改失败"})
      }
    }
  })
})
module.exports = router;
