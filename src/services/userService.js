import db from '../models';

const getDetailsUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: [ 'password', 'createdAt', 'updatedAt' ]
                }
            })
            resolve({
                status: 'OK',
                message: 'Details user!',
                data: user
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getDetailsUser: getDetailsUser
}