const Users = require('../model/authenModel');
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../../middleware/ErrorResponse')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const _ = require('lodash')


exports.name = async(req, res, next) => {
    const id = req.params.id

    try {
        const userName = await Users.findById(id)
        const name = userName.name
        res.status(200).json({
            name
        })
    } catch (error) {
        next(error)
    }
}

exports.register = async(req, res, next) => {
    const { email, name, password, address, gender, phone } = req.body
    try {

        const creatUser = await Users.create({ email, name, password, address, gender, phone })

        return sendToken(creatUser, 200, res)

    } catch (error) {
        next(error)
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {

        return next(new ErrorResponse('vui long nhap thong tin', 404))
    }
    try {
        const user = await Users.findOne({ email }).select("+password")
        if (!user) {
            return next(new ErrorResponse('nguoi dung khong ton tai', 404))
        }
        const isMatchPassword = await user.matchPassword(password)
        if (!isMatchPassword) {
            return next(new ErrorResponse('mat khau khong hop le'), 404)
        }
        sendToken(user, 200, res)
    } catch (error) {
        next(error)
    }

}
exports.forgotPassword = function(req, res, next) {
    crypto.randomBytes(4, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")

        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) {

                return next(new ErrorResponse('User dont exits'), 400)
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "truonggiangk99@gmail.com",
                    pass: "nguyentruonggiang1412"
                }
            });
            const mainOptions = {
                from: "truonggiangk99@gmail.com",
                to: user.email,
                subject: "password reset",
                html: `
                <p>you request for password reset</p>
                <h5>click in this <a href="http://localhost:9000/resetpassword">click </a>code : ${token}</h5>
                `
            }

            return user.updateOne({ resetpasswordtoken: token }, function(err, success) {
                if (err) {
                    return next(new ErrorResponse('reset password link error', 404))
                } else {
                    transporter.sendMail(mainOptions, function(err, info) {
                        if (err) {
                            console.log(err);

                        } else {
                            res.status(200).json({
                                success: true,
                                message: ('Message sent: ' + info.response)
                            })

                        }
                    });
                }
            })
        })
    })
}




exports.resetPassword = async(req, res, next) => {
    const { newPass, resetpasswordtoken } = req.body;


    if (resetpasswordtoken) {
        jwt.verify(resetpasswordtoken, process.env.JWT_Secret, function(error, decodedData) {

            Users.findOne({ resetpasswordtoken }, (err, user) => {
                if (err || !user) {
                    return next(new ErrorResponse('Users with this token do not exit', 400))
                }
                const obj = {
                    password: newPass,
                    resetpasswordtoken: ''
                }
                user = _.extend(user, obj);
                user.save((err, result) => {
                    if (err) {
                        return next(new ErrorResponse('đặt lại lỗi mật khẩu!!!', 400))
                    } else {
                        return res.status(200).json({ message: "Mật khẩu của bạn đã được thay đổi" })
                    }
                })
            })
        })
    } else {
        return res.status(401).json({
            error: "authentication error!!"
        })
    }
}





const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    return res.status(200).json({
        success: true,
        token
    })
}