import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    
    render() {
        const isAuthenticated = localStorage.getItem('token');

        return isAuthenticated ? (
            <Route {...this.props} />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute;