import React from 'react';
import styled from 'styled-components';
import { darken, rgba } from 'polished';

const ConfirmWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${rgba('#444', 0.5)};
	z-index: 30;
`;
const ConfirmModal = styled.div`
	padding: 40px;
	background-color: ${p => p.theme.colors.white};
	position: relative;
	z-index: 40;
`;
const ConfirmTitle = styled.div`
	text-align: center;
	line-height: 5rem;
	font-size: 1.5rem;
	font-weight: bold;
`;
const ConfirmContent = styled.div`
	margin-bottom: 20px;
`;
const ConfirmActions = styled.div`
	display: flex;
	flex-direction: row;
	align-content: space-between;
`;
const ConfirmAction = styled.div`
	padding: 0 20px;
`;
const ConfirmButton = styled.button`
	all: unset;
	margin: auto;
	line-height: 50px;
	width: 100px;
	text-align: center;
	background: ${p => (p.primary ? p.theme.colors.blue : p.theme.colors.pink)};
	color: ${p => p.theme.colors.white};
	border: 2px solid ${p => p.theme.colors.white};
	opacity: 1;
	cursor: pointer;
	&:hover,
	&:active {
		background: ${p => darken(0.1, p.theme.colors.buttonBg)};
	}
`;

export default function Confirm({
	modal,
	toggleModal,
	confirm,
	children,
	confirmLabel = 'Ja',
	cancelLabel = 'Nei',
}) {
	if (!modal) {
		return null;
	}

	return (
		<ConfirmWrapper onClick={() => toggleModal(false)}>
			<ConfirmModal onClick={e => e.stopPropagation()}>
				{children ? (
					<ConfirmContent>{children}</ConfirmContent>
				) : (
					<ConfirmTitle>Er du sikker?</ConfirmTitle>
				)}

				<ConfirmActions>
					<ConfirmAction>
						<ConfirmButton onClick={() => confirm()} primary={true}>
							{confirmLabel}
						</ConfirmButton>
					</ConfirmAction>

					<ConfirmAction>
						<ConfirmButton onClick={() => toggleModal(false)}>
							{cancelLabel}
						</ConfirmButton>
					</ConfirmAction>
				</ConfirmActions>
			</ConfirmModal>
		</ConfirmWrapper>
	);
}
