/* 连接数据共用模块 */
//引入mysql
const mysql = require ('mysql');
//创建连接
const connection = mysql.createConnection ({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database :'sever'
});

// 执行连接
connection.connect(() => {
  console.log('数据库连接成功!')
});

//暴露
module.exports = connection;