// 连接数据库公用模块
// 引入mysql
const mysql = require("mysql");
// 使用mysql连接数据库
const connection = mysql.createConnection({
    host:'localhost',//数据地址
    user:'root',//用户名
    password:"ROOT",//密码
    database:"sever"//数据库名字
})
// 执行连接
connection.connect(() => {
    console.log("数据库连接成功")
})

// 暴露出去
module.exports = connection