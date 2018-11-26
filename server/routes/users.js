var express = require('express');
var router = express.Router();
//引入数据库连接模块
const connection = require('./connect');

/* 设置集体响应头 */
router.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/* 检测用户名有效性 */
router.post('/checklogin', (req, res) => {
  let { username, password } = req.body;
  const sqlStr = `select * from users where username='${username}' and password='${password}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length) {
        res.cookie('userid', data[0].id);
        res.cookie('username', data[0].username);

        res.send({"rstCode":1, "msg":"欢迎您! 登录成功!"})
      } else {
        res.send({"rstCode":0, "msg":"请检查用户名或密码!"})
      }
    }
  })
});

/* 检查用户登录状态 */
router.get('/checkIsLogin', (req, res) => {
  let userid = req.cookies.userid;
  let username = req.cookies.username;
  if (userid && username) {
    res.send({"isLogin": true})
  } else {
    res.send({"isLogin": false})
  }
});

/* 退出登录 */
router.get('/logout', (req, res) => {
  // 清除cookie
  res.clearCookie('userid');
  res.clearCookie('username');

  // 返回给前端 退出登录成功的信息
  res.send({"rstCode":1, "msg":"退出成功, 欢迎回来! 哥哥！"})
});

/* 验证旧密码 */
router.get('/checkoldpwd', (req, res) => {
  let { oldPwd } = req.query;
  let id = req.cookies.userid;
  const sqlStr = `select * from users where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length) {
        if ( oldPwd === data[0].password ) {
          res.send({"rstCode":1, "msg":"旧密码正确"})
        } else {
          res.send({"rstCode":0, "msg":"旧密码不正确"})
        }
      } else {
        res.send({"rstCode":501, "msg":"请求异常"})
      }
    }
  })
});

/* 保存新密码 */
router.get('/savenewpwd', (req, res) => {
  let { newPwd } = req.query;
  let id = req.cookies.userid;
  const sqlStr = `update users set password='${newPwd}' where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.clearCookie('userid');
        res.clearCookie('username');
        res.send({"rstCode":1, "msg":"修改密码成功！请重新登录！"})
      } else {
        res.send({"rstCode":1, "msg":"修改密码失败！"})
      }
    }
  })
});

/* 添加账号 */
router.post('/add-account', (req, res) => {
  // 先设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.send ("aaa")
  //接受参数
  let {username, password, selectuser} = req.body;
  // console.log(username, password, selectuser);
  //将数据存入数据库
  const sqlStr = `insert into account (username,password,selectuser) values(?,?,?)`;
  //参数列表
  const sqlParams = [username, password, selectuser];
  //执行sql语句
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      if (data.affectedRows > 0) {
        res.send({'rstCode': 1, 'msg': '添加成功'})
      } else {
        res.send({'rstCode': 0, 'msg': '添加失败'})
      }
    }
  })
});

/* 接受用户账号列表请求 */
router.get('/my-account-by-page', (req, res) => {
  // 先设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  let {currentPage, pageSize} = req.query;
  /* 设置默然参数 */
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;
  let sqlStr = 'select * from users order by cdate desc';
  // 查询所有数据 计算出数据总条数
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      let totalCount = data.length;
      let n = (currentPage - 1) * pageSize;
      // 分页查询语句
      sqlStr += ` limit ${n}, ${pageSize}`;
      // 执行sql语句
      connection.query(sqlStr, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({"totalCount": totalCount, "data": data});
        }
      })
    }
  })
});

/* 删除请求 */
router.get('/del-account', (req, res) => {
  // 先设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  let {id} = req.query;
  const sqlStr = `delete from account where id = ${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({'rstCode': 1, 'msg': '删除成功'})
      } else {
        res.send({'rstCode': 0, 'msg': '删除失败'})
      }
    }
  })
});

/* 数据回显 */
router.get('/edituser', (req, res) => {
  let {id} = req.query;
  const sqlStr = `select * from users where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
});

/* 保存更改数据 */
router.post('/saveedit', (req, res) => {
  let {username, password, usergroup, editId} = req.body;
  const sqlStr = `update users set username='${username}', password='${password}', usergroup='${usergroup}' where id=${editId}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({"rstCode": 1, "msg": "修改成功!"})
      } else {
        res.send({"rstCode": 0, "msg": "修改失败!"})
      }
    }
  })
});

/* 批量删除 */
router.post('/batchdel', (req, res) => {
  let {idArr} = req.body;
  idArr = JSON.parse(idArr);
  const sqlStr = `delete from users where id in (${idArr})`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({"rstCode": 1, "msg": "批量删除成功"})
      } else {
        res.send({"rstCode": 0, "msg": "批量删除失败"})
      }
    }
  })
});

module.exports = router;
