### Error Handling in React Router

Proper error handling is crucial for creating a resilient web application. In React Router, you can manage errors that occur during navigation by utilizing the `errorElement` property within your route configuration. This allows you to define a specific component to render whenever an error is encountered on a route. Below, we'll implement an `ErrorPage` component and integrate it into the router configuration.

#### ErrorPage Component

The `ErrorPage` component uses React Router's `useRouteError` hook to access errors that occur during navigation. It also utilizes `isRouteErrorResponse` to determine if the error is a routing-related error, providing more context-specific error messages:

```javascript
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);  // For debugging: logs the error to the console

    return (
        <div className='m-5'>
            <h1>Oops!</h1>
            <p>
                {isRouteErrorResponse(error) ? 'Invalid Page' : 'Something went wrong...'}
            </p>
        </div>
    );
};

export default ErrorPage;
```

In this component:
- **`useRouteError()`** retrieves the error thrown during routing.
- **`isRouteErrorResponse()`** checks if the error is related to routing. If true, it indicates an issue such as a non-existent page; otherwise, the error is likely from another source, such as a network issue or a bug in the route's component.

#### Integrating Error Handling in the Router Configuration

Next, integrate the `ErrorPage` component into the router configuration. You'll add an `errorElement` to the root route so that any navigation errors within the application will fallback to this error handling component.

```javascript
import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/home/home';
import UsersIndex from '../views/users/list';
import UserShow from '../views/users/details/show';
import TodosIndex from '../views/todos/list';
import Layout from './layout';
import ErrorPage from '../views/errors/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Home /> },
            {
                path: 'users',
                element: <UsersIndex />,
                children: [
                    { path: ':id', element: <UserShow /> }
                ]
            },
            { path: 'todos', element: <TodosIndex /> }
        ]
    }
]);

export default router;
```

