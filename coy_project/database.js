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

// //数据池连接
// database.sql = function(query, callback) {
//     if (!query) {
//         callback();
//         return;
//     }

//     mysql.createPool.query(query, function(err, rows) {
//         if (err) {
//             callback(err, null);
//             return;
//         }
//         callback(null, rows);
//     })
// }

module.exports = database;