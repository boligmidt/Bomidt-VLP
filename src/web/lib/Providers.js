import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { ThemeProvider } from 'styled-components';

import { AppProvider } from 'web/lib/AppProvider';
import { useAuth0 } from 'web/lib/react-auth0-spa';
import GlobalStyles from 'web/styles/globalStyles.js';
import theme from 'web/styles/theme.js';
import env from 'web/env';
import '@fortawesome/fontawesome-pro/css/all.css';

// Apollo
const httpLink = new HttpLink({
	uri: '/graphql',
	credentials: 'same-origin',
});

export function Providers({ children }) {
	const [currentToken, setCurrentToken] = useState();
	const { loading, isAuthenticated, token } = useAuth0();

	const authLink = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				authorization: currentToken,
			},
		});

		return forward(operation);
	});

	const apolloClient = new ApolloClient({
		link: concat(authLink, httpLink),
		cache: new InMemoryCache(),
	});
	// apollo end

	if (!loading && isAuthenticated && !currentToken) {
		setCurrentToken(`${token}`);
	}

	return (
		<ApolloProvider client={apolloClient}>
			<AppProvider hasToken={currentToken ? true : false}>
				<ThemeProvider theme={theme}>
					<>
						<GlobalStyles />
						{children}
					</>
				</ThemeProvider>
			</AppProvider>
		</ApolloProvider>
	);
}
