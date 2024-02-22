import './App.scss';
import Default from './container/Default';
import routes from './routes';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Bounce, ToastContainer } from 'react-toastify';

// const router = createBrowserRouter(
//     routes.map((route) => {
//         let path = route.path;
//         let element = route.element;
//         let isShowHeader = route.isShowHeader;
//         let isShowFooter = route.isShowFooter;
//         return {
//             path: path,
//             element: (
//                 <Default isShowHeader={isShowHeader} isShowFooter={isShowFooter} children={element} />
//             )
//         }
//     })
// )

function App(props) {
    return (
        <Router>
            <div className="App">
                <Switch>
                    {routes.map((route, index) => {
                        let path = route.path;
                        let element = route.element;
                        let isShowHeader = route.isShowHeader;
                        let isShowFooter = route.isShowFooter;
                        return (
                            <Route path={path} key={index} exact>
                                <Default children={element} isShowHeader={isShowHeader} isShowFooter={isShowFooter} />
                            </Route>
                        )
                    })}
                </Switch>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </Router>
    );
}

export default App;
