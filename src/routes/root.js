import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import authRoutes from './authRoutes';

const testMiddleware = (req, res, next) => {
    console.log('Calling a middleware!');
    next();
}

const configWebRouter = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/post', postRoutes);
}

export default configWebRouter;