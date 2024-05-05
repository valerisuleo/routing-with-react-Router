import { createBrowserRouter } from 'react-router-dom';
import { TodosIndex } from '../views/todos/list';
import UsersIndex from '../views/users/list';
import Layout from './layout';
import Home from '../views/home/home';
import UserShow from '../views/users/details/show';
import ErrorPage from '../common/errors/error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { path: '', element: <Home /> },
            {
                path: '/users',
                element: <UsersIndex />,
                children: [{ path: ':id', element: <UserShow /> }],
            },
            { path: '/todos', element: <TodosIndex /> },
        ],
    },
]);

export default router;
