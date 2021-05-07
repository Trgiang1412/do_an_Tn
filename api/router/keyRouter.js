const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/keyMdw')
const jwt = require('jsonwebtoken')

router.route('/private').get(verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_Secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post create.....',
                authData
            });
        }
    })
    res.json({
        message: 'post creat.....'
    });
});
module.exports = router