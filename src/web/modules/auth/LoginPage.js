import React from 'react';
import styled from 'styled-components';

import loginBg from 'assets/images/login-bg.jpg';
import Logo from 'assets/images/logo.svg';
import { Button } from 'components/general/Buttons';
import env from 'web/env';
import { breakpoints } from 'web/styles/breakpoints';

const PageWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
	display: flex;
`;

const LeftWrapper = styled.div`
	${breakpoints.large`
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: calc(100% - 200px);
		background: url(${loginBg}) no-repeat center;
		background-size: cover;
	`};
`;

const RightWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

	${breakpoints.large`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 500px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: transparent;

		&:before {
			content: " ";
			display: block;
			background: white;
			width: 1000px;
			position: absolute;
			top: -300px;
			left: -200px;
			bottom: -300px;
			transform: rotate(-20deg);
			z-index: 0;
		}
	`};
`;

const LoginWrapper = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;

	${breakpoints.large`
		width: 400px;
		padding: 20px;
	`};
`;

const LogoWrapper = styled.div`
	display: block;
	width: 200px;
	height: auto;
	margin-bottom: 34px;
`;

const Paragraph = styled.p`
	font-family: ${p => p.theme.fontFamily};
	font-size: 20px;
	letter-spacing: 0.2px;
	line-height: 30px;
	text-align: center;
	margin-bottom: 30px;
`;

export default function LoginPage({ loginButtonClick }) {
	return (
		<PageWrapper>
			<LeftWrapper />
			<RightWrapper>
				<LoginWrapper>
					<LogoWrapper>
						{env.REACT_APP_SYSTEM_LOGO_URL && (
							<img
								src={env.REACT_APP_SYSTEM_LOGO_URL}
								alt={env.REACT_APP_SYSTEM_TITLE || 'VLP'}
								style={{ maxWidth: '100%' }}
							/>
						)}

						{env.REACT_APP_SHOW_DEFAULT_LOGO !== 'false' &&
							!env.REACT_APP_SYSTEM_LOGO_URL && <Logo />}

						{env.REACT_APP_SHOW_SYSTEM_TITLE !== 'false' &&
							env.REACT_APP_SYSTEM_TITLE && (
								<h2>{env.REACT_APP_SYSTEM_TITLE || 'VLP'}</h2>
							)}
					</LogoWrapper>

					<Paragraph>
						Her kan du logge deg inn for å få en oversikt over dine
						vedlikeholdsplaner
					</Paragraph>

					<Paragraph>
						<strong>
							NB! Om det er første gang du logger på det nye
							systemet må du trykke glemt passord under
							innlogginga
						</strong>
					</Paragraph>

					<Button onClick={loginButtonClick}>Logg inn</Button>
				</LoginWrapper>
			</RightWrapper>
		</PageWrapper>
	);
}
