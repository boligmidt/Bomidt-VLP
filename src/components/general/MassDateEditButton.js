import React, { useState } from 'react';
import { Button, IconButton } from 'components/general/Buttons';
import DatePicker from 'components/general/DatePicker';
import moment from 'moment';

export default function MassDateEditButton({ handleExecution }) {
	const [showPicker, setShowPicker] = useState(false);
	const [date, setDate] = useState(null);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				marginTop: '10px',
			}}>
			{!showPicker && (
				<IconButton
					label="Endre opprettelsesdato"
					style={{
						fontSize: '1rem',
						padding: '10px',
						height: '35px',
					}}
					iconProps={{
						icon: 'calendar',
						solid: true,
					}}
					onClick={() => setShowPicker(true)}
				/>
			)}

			{showPicker && (
				<>
					<DatePicker
						name="mass-edit-date"
						handleOnChange={value => setDate(moment(value, 'x'))}
					/>
					<Button
						style={{
							marginLeft: '10px',
							fontSize: '1rem',
						}}
						onClick={() => {
							if (confirm('Er du sikker?')) {
								handleExecution(date);
							}
							setShowPicker(false);
						}}>
						Lagre
					</Button>
				</>
			)}
		</div>
	);
}
