import React from 'react';

import { Container } from 'components/layout/Layout';

export default function AuthLayout({ children }) {
	return (
		<Container className="container">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				{children ? children : 'content'}
			</div>
		</Container>
	);
}
