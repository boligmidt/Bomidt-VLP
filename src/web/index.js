import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
moment.locale('nb');
import Loading from 'components/general/Loading';
import Router from 'web/lib/Router';
import { Providers } from 'web/lib/Providers';
import { Auth0Provider, useAuth0 } from 'web/lib/react-auth0-spa';
import { useAppContext } from 'web/lib/AppProvider';
import LoginPage from 'web/modules/auth/LoginPage';
import env from 'web/env';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
	window.history.replaceState(
		{},
		document.title,
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

function App() {
	const { isAuthenticated, loginWithRedirect, loading } = useAuth0();
	const { loadingUser } = useAppContext();

	if (loading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <LoginPage loginButtonClick={() => loginWithRedirect({})} />;
	}

	if (loadingUser) {
		return <Loading />;
	}

	return <Router />;
}

render(
	<Auth0Provider
		domain={env.REACT_APP_AUTH0_DOMAIN}
		client_id={env.REACT_APP_AUTH0_CLIENT_ID}
		audience={env.REACT_APP_AUTH0_AUDIENCE}
		response_type="token id_token"
		redirect_uri={window.location.origin}
		onRedirectCallback={onRedirectCallback}>
		<Providers>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Providers>
	</Auth0Provider>,
	document.getElementById('app-root')
);
