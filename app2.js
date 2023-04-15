// 以 Express 建立 Web 伺服器
var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// app.use((req, res, next) => {
//     req.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
app.listen(3702);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");



var mysql = require('mysql');
const { Update } = require("@mui/icons-material");
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:'3306',
    database:'biglab'

})

connection.connect(function(error){
    if (error){
        console.log(error.message)
    }else{
        console.log('連線成功')
    }
})

app.get("/attdance",function(req, res){
    connection.query("select id,EmployeeName,EmployeeId,DATE_FORMAT(starttime, '%Y-%m-%d %H:%i') as starttime,DATE_FORMAT(endtime, '%Y-%m-%d %H:%i') as endtime,holiday from att", function(error, data){
        res.send(JSON.stringify(data))
        console.log(data)
    })
})

app.put("/attdance", function(req, res){
    connection.query(
        "update att set starttime = ? , endtime = ? , holiday = ? where id ="+req.body.id,
        [req.body.starttime, req.body.endtime, req.body.holiday]
    ) ;
    res.send("Update Finish");
})

app.get("/coustomer" , function(req, res){
    connection.query("select * from customers", function(error, data){
        res.send(JSON.stringify(data))
    })
})

app.put("/coustomer", function(req, res){
    connection.query(
        "update customers set customerphone = ? , customeremail = ? , customeraddress = ? ,customerfax = ? where customerid ="+req.body.customerid,
        [req.body.customerphone, req.body.customeremail, req.body.customeraddress, req.body.customerfax]
    ) ;
    res.send("Update Finish");
})

app.post("/coustomer/create", function(req, res){
    connection.query("insert into customers set customername = ?, customerphone = ? , customeremail = ?, customeraddress = ?, customerfax = ?",
    [req.body.customername, req.body.customerphone, req.body.customeremail, req.body.customeraddress, req.body.customerfax]);
    res.send("新增成功")
})

