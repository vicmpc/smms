var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require("./connect")

// 设置多个响应头
router.all('*', (req, res, next) => {
  // 设置响应头
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  // 设置允许设置cookie
  res.setHeader('Access-Control-Allow-Credentials', true);
  // 给其他路由放行
  next();
})

// 检测用户是否可以登陆-用户名密码是否存在
router.post('/checklogin', (req, res) => {
  // // 接收用户名和密码
  let { username, password } = req.body;

  // // 构造sql 查询用户名和密码是否存在（且的关系）
  const sqlStr = `select * from account where username='${username}'and password='${password}'`;
  console.log(sqlStr)
  // // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length) {
        // 设置cookie 必须设置在res.send()之前
        res.cookie('userid', data[0].id);
        res.cookie('username', data[0].username);

        res.send({"rstCode":1, "msg":"登录成功!"})
      } else {
        res.send({"rstCode":0, "msg":"请检查用户名或密码!"})
      }
    }
  })
})
// 检测用户状态（是否已经登陆过）
router.get('/checkIsLogin',(req,res) => {
  //  // 获取浏览器的cookie
   let userid = req.cookies.userid;
   let username = req.cookies.username;
 
   // 如果都存在 证明用户登录过 
   if (userid && username) {
     // 存在 证明登录过
     res.send({"isLogin": true})
   } else {
     // 不存在 证明没有登录
     res.send({"isLogin": false})
   }
})


  // 接收请求 退出登录 /logout

router.get('/logout', (req, res) => {
  // 清除cookie
  res.clearCookie('userid');
  res.clearCookie('username');

  // 返回给前端 退出登录成功的信息
  res.send({"rstCode":1, "msg":"退出成功"})
})


//  显示当前登录的用户名 /getusername

router.get('/getusername', (req, res) => {
    // 从cookie里面获取用户名 
    let username = req.cookies.username;
    // 直接把用户名返回给前端
    res.send(username)
})

// 账号管理路由
router.post('/addmember', (req, res) => {
  // 接收参数
  let { username, usergrade, userintegral, discount, userstate, tel, landlinenumber } = req.body;

  console.log(username, usergrade, userintegral, discount, userstate, tel, landlinenumber)
  // 构造插入数据库的sql语句
  const sqlStr = `insert into member(username,usergrade,userintegral,discount,userstate,tel,landlinenumber) values (?,?,?,?,?,?,?)`;

  // 参数列表
  const sqlParams = [username, usergrade, userintegral, discount, userstate, tel, landlinenumber];
  // 执行sql语句
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "添加账号成功" })
      } else {
        res.send({ "rstCode": 0, "msg": "添加账号失败" })
      }
    }
  })
})

// 接受会员账号列表请求
// router.get('/memberlist',(req,res) => {

//   // 构造sql查询所有用户账号数据
//   const sqlStr = "select * from member order by cardid desc"

//   // 执行sql语句
//   connection.query(sqlStr,(err,data) => {
//     if(err){
//       throw err;
//     }else{
//       res.send(data)
//     }
//   })
// })

// memberlistbypage
router.get('/memberlistbypage', (req, res) => {

  // 接收两个参数currentPage(当前页码) pageSize(每页多少条)
  let { currentPage, pageSize } = req.query;

  /* 设置默然参数 */
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 5;

  let sqlStr = 'select * from member order by cardid desc'
  // 执行sql语句 查询所有数据 计算出数据总条数
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err // 如果有错 抛出错误
    } else {
      let totalCount = data.length;

      // 计算分页条件
      let n = (currentPage - 1) * pageSize;
      // 构造分页查询的sql语句
      sqlStr += ` limit ${n}, ${pageSize}`;
      // 执行sql语句
      connection.query(sqlStr, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({ "totalCount": totalCount, "data": data });
        }
      })
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
        res.send({ "rstCode": 1, "msg": "删除成功" })
      } else {
        // 否则就是删除失败 返回删除失败的信息给前端
        res.send({ "rstCode": 0, "msg": "删除失败" })
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
        res.send({ "rstCode": 1, "msg": "批量删除成功" })
      } else {
        // 否则就是失败 返回失败的信息给前端
        res.send({ "rstCode": 0, "msg": "批量删除失败" })
      }
    }
  })
})

// 
router.post('/saveedit', (req, res) => {
  // 接收新的数据和原来的cardid
  let { username, usergrade, userintegral, userstate, discount, tel, landlinenumber, editId } = req.body;
  // 构造sql语句
  const sqlStr = `update member set username='${username}',usergrade='${usergrade}',userintegral='${userintegral}',userstate='${userstate}',discount='${discount}',tel='${tel}',landlinenumber='${landlinenumber}'where cardid='${editId}'`

  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "修改成功" })
      } else {
        res.send({ "rstCode": 0, "msg": "修改失败" })
      }
    }
  })
})

/* 
分类管理
*/
// router.get('/addclassification',(req,res) => {
//   // 接收前端发送的数据
//   let { sort,sortname,userstate} = req.query;
//   // 构造数据库
// })
module.exports = router;
