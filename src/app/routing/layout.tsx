import { Fragment } from 'react';
import NavbarComponent from '../components/nav/navbar-component';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Fragment>
            <NavbarComponent></NavbarComponent>
            <main className="container">
                <Outlet></Outlet>
            </main>
        </Fragment>
    );
};

export default Layout;
