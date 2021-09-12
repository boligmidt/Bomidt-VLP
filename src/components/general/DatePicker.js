import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import styled from 'styled-components';
import theme from 'web/styles/theme';

const PickerWrap = styled.div`
	pointer-events: ${p => (p.disabled ? 'none' : 'initial')};

	.MuiTextField-root {
		width: 100%;
	}
	&&& .MuiInput-root {
		display: flex;
	}
	&&& .MuiInputBase-input {
		height: 32px;
		font-family: ${p => p.theme.fontFamily};
		color: ${p => p.theme.colors.blue};
		font-size: 18px;
		font-weight: 700;
	}
	&&& .MuiInput-underline:before,
	&&& .MuiInput-underline::after {
		border-bottom: 1px solid ${p => p.theme.colors.lightGray};
	}
	&&& .MuiIconButton-label {
		color: ${p => p.theme.colors.blue};
	}
`;

const materialTheme = createMuiTheme({
	overrides: {
		MuiPickersToolbar: {
			toolbar: {
				backgroundColor: theme.colors.blue,
			},
		},
	},
});

export default function DatePicker({
	disabled = false,
	handleOnChange = null,
	...props
}) {
	const [value, setValue] = useState(props.defaultValue);

	return (
		<PickerWrap disabled={disabled}>
			<ThemeProvider theme={materialTheme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<KeyboardDatePicker
						value={value}
						onChange={date => {
							setValue(date);
							if (handleOnChange) {
								handleOnChange(date);
							}
						}}
						format="YYYY/MM/DD"
						cancelLabel="Avbryt"
						disabled={disabled}
					/>
				</MuiPickersUtilsProvider>
			</ThemeProvider>

			<input type="hidden" name={props.name} value={value} />
		</PickerWrap>
	);
}
