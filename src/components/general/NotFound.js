import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Message = styled.h2`
	text-align: center;
`;

export default function NotFound({ message }) {
	return (
		<MessageWrapper>
			<Message>
				{message
					? message
					: 'Denne oppføringen finnes ikke eller har blitt fjernet.'}
			</Message>
		</MessageWrapper>
	);
}
