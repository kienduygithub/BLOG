const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'root_password', 'bkd2020', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connectDB;