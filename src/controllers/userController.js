import userService from '../services/userService';

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.query.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Got trouble when get details!'
            })
        }
        const response = await userService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

module.exports = {
    getDetailsUser: getDetailsUser
}