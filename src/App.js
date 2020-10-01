import React from 'react';
import {ThemeProvider, createMuiTheme} from '@material-ui/core';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { LoginPage, AdminHomePage, UserCreatePage } from './pages';
import { Header, ProtectedRoute } from './components';
import './App.css';

const theme = createMuiTheme({
	typography: {
        fontFamily: [
                'Nunito',
                'Roboto',
            ].join(','),
        },
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div className="app-container">
					<Route path="/" component={Header} />
					<div className="route-container">
						<div className="route-switch-container">
							<Switch>
								<Route path="/login" exact component={LoginPage} />
								<Route path="/user/create" exact component={UserCreatePage} />
								
								<ProtectedRoute path="/admin/home" exact component={AdminHomePage} />
								<Route component={LoginPage}>
									<Redirect to="/login" />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App;
