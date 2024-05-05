import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    const error = useRouteError()
    console.log(error);
    
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
