# React Router

Welcome to the React Router tutorial! This guide is designed to help you understand how routing works in React applications using the popular `react-router-dom` library. We'll cover everything from setting up basic routes to handling nested routes.

## Table of Contents

1. **Introduction**
2. **Setting Up Routing**
3. **Navigation**
4. **Passing Data with Route Parameters**
5. **Getting Data about the Current Route**
6. **Nested Routes**


## Getting Started

To get started, ensure you have `react-router-dom` installed in your project:

```bash
npm install react-router-dom
```


## 1. Introduction to React Router

React Router is a standard library for routing in React. It enables the implementation of dynamic routing in a web application. A dynamic route is one where the navigation between components is handled internally by the JavaScript without the need to reload the page.

## 2. Setting Up Routing

First, let's set up the basic routing in a React application. Below is how you would set up a `BrowserRouter` and define some routes using `react-router-dom`:

```javascript
// Import necessary components from react-router-dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import UserListPage from './UserListPage';

// Create a router.tsx file
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/users', element: <UserListPage /> },
]);

// Use RouterProvider to integrate routing into your app
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
```

## 3. Navigation

For navigation between pages, React Router provides `Link` and `useNavigate`:

#### Using `Link`:
```javascript
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}
```

#### Using `useNavigate`:
```javascript
import { useNavigate } from 'react-router-dom';

function HomeButton() {
  let navigate = useNavigate();
  return (
    <button onClick={() => navigate('/')}>
      Go Home
    </button>
  );
}
```

## 4. Passing Data with Route Parameters

To pass and retrieve parameters through routes, use `useParams`:

```javascript
import { useParams } from 'react-router-dom';

function UserDetail() {
  let { userId } = useParams();
  return <h2>User ID: {userId}</h2>;
}
```
And the route would be defined as:
```javascript
{ path: '/users/:userId', element: <UserDetail /> }
```

## 5. Getting Data about the Current Route

Using `useLocation` and `useSearchParams` to manage query parameters and state:

#### `useLocation`:
```javascript
import { useLocation } from 'react-router-dom';

function CurrentLocation() {
  let location = useLocation();
  console.log(location);
  return <p>Current path: {location.pathname}</p>;
}
```

#### `useSearchParams`:
```javascript
import { useSearchParams } from 'react-router-dom';

function SearchParamsComponent() {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <p>Query: {searchParams.get('query')}</p>
      <button onClick={() => setSearchParams({ query: 'newQuery' })}>
        Update Search
      </button>
    </div>
  );
}
```

## 6. Nested Routes

Nested routes allow components to have their own sub-routes. Here is how you could implement nested routes:

```javascript
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import UserDetail from './UserDetail';

const router = createBrowserRouter([
  {
    path: 'users',
    element: <UserListPage />,
    children: [
      { path: ':userId', element: <UserDetail /> },
    ],
  },
]);

function UserListPage() {
  return (
    <div>
      <h1>Users</h1>
      <Outlet />  {/* Where nested routes render */}
    </div>
  );
}
```

In the example above, when you navigate to `/users/1`, the `UserListPage` component renders, and within it, `UserDetail` renders in place of `<Outlet />` displaying the details for user 1. This setup facilitates the creation of complex user interfaces where different segments of the UI depend on the hierarchy of the routes.



### Flat vs Nested configuration

Here's an explanation of each setup and how they differ:

#### Flat Route Configuration
In the configuration you've mentioned:

```javascript
const router = createBrowserRouter([
  {
    path: '/users',
    element: <UserListPage />,  
  },
  { path: '/users/:userId', element: <UserDetail /> }
]);
```
This setup is a **flat route configuration**. Here’s what happens:

- **`/users`**: This route will render the `UserListPage` component.
- **`/users/:userId`**: This route will render the `UserDetail` component, but it does not render `UserListPage`. When you navigate to `/users/:userId`, only the `UserDetail` component is displayed, and the `UserListPage` is unmounted.

This arrangement is useful when you want each route to independently manage its rendering and the parent-child relationship doesn't require maintaining any shared layout or state through an `<Outlet>`.

#### Nested Route Configuration
In contrast, a nested route setup looks like this:

```javascript
const router = createBrowserRouter([
  {
    path: '/users',
    element: <UserListPage />,
    children: [
      { path: ':userId', element: <UserDetail /> }
    ]
  }
]);
```
In this scenario:

- **`/users`**: This route renders the `UserListPage` component.
- **`/users/:userId`**: This route still renders the `UserListPage`, but it also renders `UserDetail` in place of an `<Outlet>` within `UserListPage`.

The nested route configuration is particularly advantageous when:

1. **Shared Layout**: You want to maintain a common layout or elements, such as headers, footers, navigation bars, or sidebars, that should not re-render when navigating between parent and child routes.
2. **Contextual Information**: You want to maintain context or state from the parent route that might be needed by the child routes, enhancing performance by avoiding re-fetching data or recalculating derived data.
3. **Hierarchical Relationships**: You are representing a hierarchical relationship in the UI, such as viewing a list of items (`UserListPage`) and then a detailed view of one item (`UserDetail`) where the list is still visible or accessible.

### Conclusion
The choice between flat and nested routes should be guided by the specific needs of your application's structure and behavior:
- **Flat Routes** are simpler and suitable when each route is a completely independent view.
- **Nested Routes** offer more complex arrangements that support a structured hierarchy, making them ideal for applications with layers of related content.

In summary, the nested routes allow components to remain mounted and visible, or to preserve their state when navigating to child routes, whereas flat routes do not inherently offer this capability.