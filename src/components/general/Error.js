import React from 'react';
import styled from 'styled-components';
import env from 'web/env';

const StyledError = styled.div``;

const Message = styled.div``;

export default function Error({ error }) {
	if (env.NODE_ENV === 'development') {
		console.log(error);
	}

	return (
		<StyledError>
			<Message>Det oppstod en feil! Vennligst kontakt brukerstøtte hvis problemet vedvarer!</Message>
			<Message>`Følgende feilmelding ble gitt:
				${error}`</Message>
		</StyledError>
	);
}
