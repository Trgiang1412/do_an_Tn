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




app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, '/app/public')))






app.use(express.json())
app.use(cors())

app.use('/api/authen', require('./api/router/authenRouter'))
app.use('/api/authen', require('./api/router/productRouter'))
app.use('/api/authen', require('./api/router/keyRouter'))
app.use(errorHandler)






app.get('/register', (req, res) => {
    res.render('register', { layout: false })
})
app.get('/', (req, res) => {
    res.render('login', { layout: false })
})
app.get('/authentication-email', (req, res) => {
    res.render('authenEmail', { layout: false })
})
app.get('/resetpassword', (req, res) => {
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

app.get('/bag', (req, res) => {
    res.render('bag', { layout: false })
})

app.get('/clothes', (req, res) => {
    res.render('clothes', { layout: false })
})








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