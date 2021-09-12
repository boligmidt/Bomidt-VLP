import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    top: 6px;
    height: 51px;
  }
  50%,
  100% {
    top: 19px;
    height: 26px;
  }
`;

const StyledLoading = styled.div`
	height: ${p => (p.style && p.style.height ? p.style.height : '80vh')};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.div`
	display: inline-block;
	position: relative;
	width: 60px;
	height: 60px;
`;

const Bar = styled.div`
	display: inline-block;
	opacity: 0.7;
	position: absolute;
	left: 6px;
	width: 13px;
	background: ${p => p.theme.colors.blue};
	animation: ${pulse} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
`;

const Bar1 = styled(Bar)`
	left: 6px;
	animation-delay: -0.24s;
`;

const Bar2 = styled(Bar)`
	left: 26px;
	animation-delay: -0.12s;
`;

const Bar3 = styled(Bar)`
	left: 45px;
	animation-delay: 0;
`;

const Text = styled.div`
	color: ${p => p.theme.colors.blue};
	font-size: ${14 / 16}rem;
`;

export default function Loading(props) {
	return (
		<StyledLoading {...props}>
			<Icon>
				<Bar1 />
				<Bar2 />
				<Bar3 />
			</Icon>

			<Text>Laster</Text>
		</StyledLoading>
	);
}
