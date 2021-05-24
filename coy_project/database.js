let mysql = require('mysql');

//连接数据库
let options = {
    host: "localhost",
    user: "root",
    port: "3333", //默认是3306
    password: "root",
    database: "blog"
}

//创建与数据库的连接对象
let database = mysql.createConnection(options);

//建立连接
database.connect((err) => {
    if (err) throw err;
    else {
        console.log('数据库连接成功');
    }
});

module.exports = database;