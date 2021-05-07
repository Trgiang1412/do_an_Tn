require('dotenv').config({ path: './config.env' })
const express = require('express')
const mongoose = require('./config/configdb')
const cors = require('cors')
const path = require('path')
const mongodb = require('./config/configdb')
const exphbs = require('express-handlebars');
const app = express()
const { errorHandler } = require('./middleware/middleware')
const port = process.env.PORT || 9007;


mongodb()



// view enginer express-hbs
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));
// public file css img justifyContent: 'space-around',
app.use(express.static(path.join(__dirname, '/app/public')))





//app.use su dung cac phan mem trung gian middleware
app.use(express.json()) // là một hàm phần mềm trung gian được tích hợp sẵn trong Express. Nó phân tích cú pháp các yêu cầu đến với tải trọng JSON và dựa trên trình phân tích cú pháp cơ thể .
app.use(cors()) // cho phép nhiều tài nguyên khác nhau của một trang web co thể truy vấn từ domain khác vs domain trang đó 

app.use('/api/authen', require('./api/router/authenRouter'))
app.use('/api/authen', require('./api/router/productRouter'))
app.use('/api/authen', require('./api/router/keyRouter'))
app.use(errorHandler)





//app.get : lay file len server
app.get('/register', (req, res) => {
    res.render('register', { layout: false })
})
app.get('/login', (req, res) => {
    res.render('login', { layout: false })
})
app.get('/authentication-email', (req, res) => {
    res.render('authenEmail', { layout: false })
})
app.get('/resetpassword/:resetpasswordtoken', (req, res) => {
    res.render('resetPassword', { layout: false })
})
app.get('/shop', (req, res) => {
    res.render('shop', { layout: false })
})
app.get('/cart', (req, res) => {
    res.render('cart', { layout: false })
})
app.get('/home', (req, res) => {
    res.render('home', { layout: false })
})
app.get('/private', (req, res) => {
    res.send('wellcome')
})








//connect server
const server = app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`server is connect  on ${port}`)
})
server.on('listening', function() {
    console.log('ok, server is running');
});

process.on('uncaughtException', (err, promise) => {
    console.log(err);
    server.close(() => process.exit(1))
})