const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const User = new UserSchema({
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ],
        required: [true, 'vui long nhap email'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'vui long nhap ten']
    },
    password: {
        type: String,
        required: [true, 'vui long nhap password'],
        minLenght: 6,
        select: false

    },
    resetpasswordtoken: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }


})




User.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

User.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

User.methods.getSignedToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_Secret, {
        expiresIn: '10min'
    })
    return token
}

const Users = mongoose.model('Users', User);

module.exports = Users