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
  const sqlStr = `select * from account where username='${username}' and password='${password}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length) {
        res.cookie('userid', data[0].id);
        res.cookie('username', data[0].username);

        res.send({"rstCode":1, "msg":"登录成功!"})
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
  const sqlStr = `select * from account where id=${id}`;
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
  const sqlStr = `update account set password='${newPwd}' where id=${id}`;
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
router.post('/addaccount', (req, res) => {
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
router.get('/myaccount', (req, res) => {
  let {currentPage, pageSize} = req.query;
  /* 设置默然参数 */
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;
  let sqlStr = 'select * from account order by cdate desc';
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

/* 删除请求 */
router.get('/delaccount', (req, res) => {
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
  const sqlStr = `select * from account where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  })
});

// 批量删除请求路由 /batchdelmember
router.post('/batchdelmember', (req, res) => {
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

/* 保存更改数据 */
router.post('/saveedit', (req, res) => {
  let {username, password, selectuser, editId} = req.body;
  const sqlStr = `update account set username='${username}', password='${password}', selectuser='${selectuser}' where id=${editId}`;
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
  const sqlStr = `delete from account where id in (${idArr})`;
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
