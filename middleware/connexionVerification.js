require('dotenv').config();
const db = require('../models');
const jwt = require('jsonwebtoken');
const verifyUserTokenExpiration = async (req, res, next) => {
    const token = req.headers['authorization'];
    const isActive = req.headers['is-active'];
    if (isActive && isActive === 'true' && token) {
      
            jwt.verify(token, process.env.SECRET_KEY_FRONT_MOBILE, (err, decoded) => {
                if (err) {
    
                    res.status(501).json({
                        message: "You are not authorized to access this resource.",
                        code: 501
                    });
                }
                else {
                    console.log("you got the access");
                    next();
                }
            });
        }
        else {
           return  res.status(501).json({
                message: "You are not authorized to access this resource.",
                code: 501
            });
        }
}