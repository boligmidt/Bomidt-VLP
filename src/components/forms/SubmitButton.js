import React, { useContext } from "react";
import { FormContext } from "components/forms/Form";
import styled from "styled-components";
import { darken } from "polished";
import { Button } from "components/general/Buttons";

const StyledButton = styled(Button)`
	background: ${p =>
		p.disabled ? p.theme.colors.darkGray : p.theme.colors.pink};
	opacity: ${p => (p.disabled ? "0.5" : "1")};
	cursor: ${p => (p.disabled ? "default" : "pointer")};
	&:hover,
	&:active {
		background: ${p =>
			p.disabled
				? p.theme.colors.darkGray
				: darken(0.1, p.theme.colors.buttonBg)};
	}
`;

export default function SubmitButton({ children, ...props }) {
	let context = useContext(FormContext);

	return (
		<StyledButton
			type="submit"
			disabled={context.isDisabled || context.isLoading || props.disabled}
		>
			{context.isLoading && "..."}
			{!context.isLoading && children}
		</StyledButton>
	);
}
