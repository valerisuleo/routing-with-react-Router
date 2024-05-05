# Layout Component

First, let’s define a `Layout` component that integrates the `NavbarComponent` for consistent navigation and uses an `<Outlet>` to render route-specific content. The `<Fragment>` is used here to return multiple elements without adding extra nodes to the DOM.

```javascript
import { Fragment } from 'react';
import NavbarComponent from '../components/nav/navbar-component';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Fragment>
            <NavbarComponent />
            <main className="container">
                <Outlet />
            </main>
        </Fragment>
    );
};

export default Layout;
```

This `Layout` component is a shell for your application's UI, where `<NavbarComponent>` is the navigation bar, and `<Outlet>` serves as a placeholder that gets filled by the nested routes' components.

### Router Configuration

With the `Layout` component ready, you can set up the router configuration. This configuration defines the routes and how they are nested within the layout, ensuring that the structure defined in `Layout` persists across these routes.

```javascript
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <Home /> },
            { path: '/users', element: <UsersIndex /> },
            { path: '/todos', element: <TodosIndex /> },
        ],
    },
]);

export default router;

```

### Route Structure

This configuration establishes a top-level route (`/`) that always renders the `Layout`. Under this layout:

- The home page (`Home`) renders at the root path (`/`).
- The users list (`UsersIndex`) at `/users`, 
- The todos list (`TodosIndex`) at `/todos`.

Each of these routes will render within the `<Outlet>` of the `Layout` component, thereby inheriting the navigation bar and any other UI components defined in `Layout`.

