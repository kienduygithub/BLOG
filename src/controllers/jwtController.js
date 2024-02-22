import jwt from 'jsonwebtoken';
require('dotenv').config();

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '10s' });
    return access_token;
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '30s' });
    return refresh_token;
}

const authMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[ 1 ];
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Missing authentication token!'
            })
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, userInfo) => {
            if (err) return res.status(401).json({
                status: 'ERR',
                message: 'Invalid token!'
            })
            if (userInfo.id) {
                req.user = userInfo;
                next();
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

// REFRESH TOKEN
const handleRefreshToken = async (req, res) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                return res.status(400).json({
                    status: 'ERR',
                    message: 'Token has expired!'
                })
            }
            const { id, username, email } = user;
            const access_token = generalAccessToken({ id, username, email });
            return res.status(200).json({
                status: 'OK',
                message: 'REFRESH TOKEN',
                access_token: access_token
            })
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

module.exports = {
    generalAccessToken: generalAccessToken,
    generalRefreshToken: generalRefreshToken,
    authMiddleWare: authMiddleWare,
    handleRefreshToken: handleRefreshToken
}