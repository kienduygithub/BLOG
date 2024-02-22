import { Op } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { generalAccessToken, generalRefreshToken } from '../controllers/jwtController'

const salt = bcrypt.genSaltSync(10);

// REGISTER
const handleSignUp = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, email, password } = data;
            const existUser = await db.User.findOne({
                where: {
                    [ Op.or ]: [
                        { username: username },
                        { email: email }
                    ]
                }
            });
            if (existUser) {
                resolve({
                    status: 'ERR',
                    message: 'The information already exist!'
                });
            } else {
                const hashedPassword = await handleHash(password);
                await db.User.create({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                resolve({
                    status: 'OK',
                    message: 'User has been created'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
const handleHash = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashed = await bcrypt.hashSync(password, salt);
            resolve(hashed);
        } catch (error) {
            reject(error);
        }
    })
}

// LOGIN
const handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = data;
            const user = await db.User.findOne({
                where: { email: email },
                attributes: {
                    exclude: [ 'createdAt', 'updatedAt' ]
                },
                raw: true,
                logging: false
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'Wrong email or password'
                });
            } else {
                const isCorrectPassword = bcrypt.compareSync(password, user.password);
                if (!isCorrectPassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Wrong email or password'
                    });
                } else {
                    const payload = { id: user.id, username: user.username, email: user.email };
                    const access_token = generalAccessToken(payload);
                    const refresh_token = generalRefreshToken(payload);
                    delete user.password;
                    resolve({
                        status: 'OK',
                        message: 'LOGIN SUCCESS!',
                        data: { ...user, access_token },
                        refresh_token: refresh_token
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleSignUp: handleSignUp,
    handleLogin: handleLogin
}