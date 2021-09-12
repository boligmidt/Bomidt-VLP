import React, {
	useState,
	useEffect,
	useContext,
	createContext,
	useReducer,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useAuth0 } from 'web/lib/react-auth0-spa';
import { useWindowDimensions } from 'web/styles/breakpoints';
import Error from 'components/general/Error';

const GET_USER = gql`
	query getUser($auth0Id: ID!) {
		user: findOneUserRaw(auth0Id: $auth0Id) {
			_id
			roles {
				housingCooperativeId
				role
			}
		}
	}
`;

const STORAGE_KEY = window.location.hostname;
const DATA_STORAGE_KEY = STORAGE_KEY + '.data';
const storageAppData = localStorage.getItem(DATA_STORAGE_KEY);
const parsedAppData = JSON.parse(storageAppData);

export const AppContext = createContext({
	appData: parsedAppData,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children, hasToken }) => {
	const { width } = useWindowDimensions();
	const [loadingUser, setLoadingUser] = useState(true);
	const [initialized, setInitialized] = useState(false);
	const [search, setSearch] = useState('');
	const [address, setAddress] = useState('');
	const [searchFocus, setSearchFocus] = useState(false);

	const [appData, setAppData] = useState({
		isSidebarOpen: width >= 768,
	});

	const [currentHousingCooperative, setCurrentHousingCooperative] = useState(
		''
	);

	const { user: loggedInUser, isAuthenticated, logout } = useAuth0();

	const { data: { user = null } = {}, loading, error } = useQuery(GET_USER, {
		skip: !hasToken,
		variables: {
			auth0Id: loggedInUser && loggedInUser.sub,
		},
	});

	function updateAppData(data) {
		let updatedData = { ...appData, ...data };

		setAppData(updatedData);
		localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(updatedData));
	}

	// helpers
	const isGlobalAdmin = roles => {
		let isGlobalAdmin = false;
		roles.forEach(item => {
			if (item.housingCooperativeId === '*') {
				if (item.role === 'admin') {
					isGlobalAdmin = true;
				}
			}
		});

		return isGlobalAdmin;
	};

	const isAdmin = roles => {
		let isAdmin = false;
		roles.forEach(item => {
			if (
				item.housingCooperativeId === currentHousingCooperative ||
				item.housingCooperativeId === '*'
			) {
				if (item.role === 'admin') {
					isAdmin = true;
				}
			}
		});

		return isAdmin;
	};

	const isEditor = roles => {
		let isEditor = false;
		roles.forEach(item => {
			if (
				item.housingCooperativeId === currentHousingCooperative ||
				item.housingCooperativeId === '*'
			) {
				if (item.role === 'editor' || item.role === 'admin') {
					isEditor = true;
				}
			}
		});

		return isEditor;
	};

	const isUser = roles => {
		let isUser = false;
		roles.forEach(item => {
			if (
				item.housingCooperativeId === currentHousingCooperative ||
				item.housingCooperativeId === '*'
			) {
				if (item.role === 'user') {
					isUser = true;
				}
			}
		});

		return isUser;
	};
	// helpers end

	const [impersonate, setImpersonate] = useReducer(
		(state, { action, data }) => {
			let newState = {};
			switch (action) {
				case 'set':
					newState.user = data;
					newState.isUser = isUser(newState.user.roles);
					newState.isEditor = isEditor(newState.user.roles);
					newState.isAdmin = isAdmin(newState.user.roles);
					newState.isGlobalAdmin = isGlobalAdmin(newState.user.roles);
					break;
				case 'housingCooperative':
					newState = Object.assign(state);
					newState.isUser = isUser(newState.user.roles);
					newState.isEditor = isEditor(newState.user.roles);
					newState.isAdmin = isAdmin(newState.user.roles);
					newState.isGlobalAdmin = isGlobalAdmin(newState.user.roles);
					break;
				default:
					newState = false;
			}
			return newState;
		}
	);

	const [currentUser, setCurrentUser] = useReducer(
		(state, { action, data }) => {
			let newState = {};
			switch (action) {
				case 'set':
					newState.user = data;
					newState.isUser = isUser(newState.user.roles);
					newState.isEditor = isEditor(newState.user.roles);
					newState.isAdmin = isAdmin(newState.user.roles);
					newState.isGlobalAdmin = isGlobalAdmin(newState.user.roles);
					break;
				case 'housingCooperative':
					newState = Object.assign(state);
					newState.isUser = isUser(newState.user.roles);
					newState.isEditor = isEditor(newState.user.roles);
					newState.isAdmin = isAdmin(newState.user.roles);
					newState.isGlobalAdmin = isGlobalAdmin(newState.user.roles);
					break;
			}
			return newState;
		}
	);

	useEffect(() => {
		if (impersonate) {
			setImpersonate({ action: 'housingCooperative' });
		}
		if (currentUser) {
			setCurrentUser({ action: 'housingCooperative' });
		}

		const initUser = () => {
			if (isAuthenticated && user && !currentUser) {
				setCurrentUser({ action: 'set', data: user });

				if (!initialized) {
					const storageUserData = localStorage.getItem(STORAGE_KEY);
					if (!currentHousingCooperative && storageUserData) {
						let data = JSON.parse(storageUserData);
						setCurrentHousingCooperative(
							data.currentHousingCooperative
						);
					}
					setInitialized(true);
				}
				setLoadingUser(false);
			}
		};
		initUser();

		if (currentHousingCooperative) {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					currentHousingCooperative,
				})
			);
		}

		// eslint-disable-next-line
	}, [isAuthenticated, currentHousingCooperative, user]);

	if (loading || error) {
		if (error) {
			return (
				<>
					<Error error="Failed to load user" />
					<button
						onClick={e => {
							logout({
								returnTo: window.location.origin,
							});
						}}>
						Logout
					</button>
				</>
			);
		}
		return null;
	}
	return (
		<AppContext.Provider
			value={{
				user,
				loadingUser,
				currentHousingCooperative,
				setCurrentHousingCooperative,
				appData,
				updateAppData,
				currentUser,
				setImpersonate,
				impersonate,
				search,
				setSearch,
				address,
				setAddress,
				searchFocus,
				setSearchFocus,
				isGlobalAdmin: impersonate
					? impersonate.isGlobalAdmin
					: currentUser
					? currentUser.isGlobalAdmin
					: null,
				isAdmin: impersonate
					? impersonate.isAdmin
					: currentUser
					? currentUser.isAdmin
					: null,
				isEditor: impersonate
					? impersonate.isEditor
					: currentUser
					? currentUser.isEditor
					: null,
				isUser: impersonate
					? impersonate.isUser
					: currentUser
					? currentUser.isUser
					: null,
			}}>
			{children}
		</AppContext.Provider>
	);
};
