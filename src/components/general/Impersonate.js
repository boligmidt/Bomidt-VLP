import React from 'react';
import { useAppContext } from 'web/lib/AppProvider';

import styled from 'styled-components';
import theme from 'web/styles/theme.js';
import Icon from 'components/general/Icon';

const CurrentUser = styled.div`
	text-align: right;
`;

const ImpersonateButton = styled.button`
	all: unset;
	height: 100%;
	cursor: pointer;
`;

export default function Impersonate() {
	const { setImpersonate, impersonate } = useAppContext();

	if (!impersonate) {
		return null;
	}

	return (
		<CurrentUser>
			{impersonate.user.name}

			<ImpersonateButton
				onClick={() => setImpersonate({ action: 'unset', data: {} })}>
				<Icon icon="fingerprint" color={theme.colors.red} />
			</ImpersonateButton>
		</CurrentUser>
	);
}
