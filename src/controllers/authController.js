import authService from '../services/authService';

// REGISTER
const handleSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing required parameters!'
            })
        }
        const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const isValidEmail = reg.test(email);
        if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Wrong email!'
            });
        }
        const response = await authService.handleSignUp({ username, email, password });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        });
    }
}

// LOGIN
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing required parameters!'
            })
        }
        const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const isValidEmail = reg.test(email);
        if (!isValidEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Wrong email!'
            })
        }
        const response = await authService.handleLogin({ email, password });
        const { refresh_token, ...others } = response;
        res.cookie(process.env.REFRESH_TOKEN, refresh_token, {
            httpOnly: true,
            secure: false,
            // sameSite: 'strict'
        })
        return res.status(200).json(others)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

// LOGOUT
const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log('cookies: ', cookies)
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'LOGOUT!'
        })
    } catch (error) {
        console.log('Got trouble: ', error);
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    handleSignUp: handleSignUp,
    handleLogin: handleLogin,
    handleLogout: handleLogout
}