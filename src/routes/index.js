import Home from '../container/Home';
import Login from '../container/Login';
import Register from '../container/Register';
import Single from '../container/Single';
import Write from '../container/Write';

const routes = [
    {
        path: '/',
        element: <Home />,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/login',
        element: <Login />,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: '/register',
        element: <Register />,
        isShowHeader: false,
        isShowFooter: false
    },
    {
        path: '/post/:id',
        element: <Single />,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/write',
        element: <Write />,
        isShowHeader: true,
        isShowFooter: true
    },
];

export default routes;