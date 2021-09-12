import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { breakpoints } from 'web/styles/breakpoints';
import { Button } from 'components/general/Buttons';
import RolesSelect from './RolesSelect';
import Select from 'components/general/Select';

const ActionsWrap = styled.div`
	display: flex;
`;

const DeleteButton = styled(Button)`
	margin-left: 20px;
`;

export default function UserForm({
	onSubmit,
	values = {},
	isNew,
	hasValidEmail,
	isAdmin,
	housingCooperatives,
	disabled,
	onDeleteClick,
}) {
	const isDeletable =
		values.email !== 'ys@bomidt.no' &&
		values.email !== 'post@smartmedia.no';

	return (
		<form onSubmit={onSubmit}>
			<Field
				name="name"
				label="Navn"
				defaultValue={values.name}
				disabled={disabled || !isAdmin}
			/>
			<Field
				name="address"
				label="Adresse"
				disabled={disabled || !isAdmin}
				defaultValue={values.address}
			/>
			<Field
				name="postalNumber"
				label="Postnr"
				disabled={disabled || !isAdmin}
				defaultValue={values.postalNumber}
			/>
			<Field
				name="postalCity"
				label="Sted"
				disabled={disabled || !isAdmin}
				defaultValue={values.postalCity}
			/>
			<Field
				required
				name="email"
				label="E-post"
				defaultValue={values.email}
				disabled={isNew || !hasValidEmail ? false : true}
			/>
			<Field
				name="phone"
				label="Telefon"
				disabled={disabled || !isAdmin}
				defaultValue={values.phone}
			/>
			<Field label="Stilling" disabled={disabled || !isAdmin}>
				<Select
					options={positionOptions}
					defaultValue={values.position}
					placeholder="Velg stilling"
					name="position"
				/>
			</Field>
			<Field label="Roller" disabled={disabled || !isAdmin}>
				<RolesSelect
					housingCooperatives={housingCooperatives}
					values={values.roles}
				/>
			</Field>

			<ActionsWrap>
				<SubmitButton type="submit" disabled={disabled || !isAdmin}>
					Lagre
				</SubmitButton>

				{!isNew && isAdmin && isDeletable && (
					<DeleteButton
						type="button"
						onClick={e => {
							e.preventDefault();
							e.stopPropagation();
							onDeleteClick();
						}}>
						Slett
					</DeleteButton>
				)}
			</ActionsWrap>
		</form>
	);
}

const FieldWrap = styled.div`
	margin-bottom: 30px;
`;
const FieldLabel = styled.label`
	font-family: ${p => p.theme.fontFamily};
	font-size: ${18 / 16}rem;
	letter-spacing: 0.25px;
	line-height: 45px;

	${breakpoints.large`
		font-size: ${25 / 16}rem;
	`};
`;
const FieldContent = styled.div``;
const Input = styled.input`
	background-color: #ffffff;
	border: 1px solid #e7f5f8;
	font-size: 1.2rem;
	height: 52px;
	padding: 14px 15px;
	width: 100%;
`;

function Field(props) {
	return (
		<FieldWrap>
			<FieldLabel>{props.label}</FieldLabel>
			<FieldContent>
				{props.children || <Input type="text" {...props} />}
			</FieldContent>
		</FieldWrap>
	);
}

const SubmitButton = styled(Button)`
	background: ${p =>
		p.disabled ? p.theme.colors.darkGray : p.theme.colors.pink};
	opacity: ${p => (p.disabled ? '0.5' : '1')};
	cursor: ${p => (p.disabled ? 'default' : 'pointer')};
	&:hover,
	&:active {
		background: ${p =>
			p.disabled
				? p.theme.colors.darkGray
				: darken(0.1, p.theme.colors.buttonBg)};
	}
`;
const positionOptions = [
	{ value: 'chairman', label: 'Styreleder' },
	{ value: 'hseAdvisor', label: 'HMS-rådgiver' },
	{ value: 'boardMember', label: 'Styremedlem' },
	{ value: 'surveyor', label: 'Takstman' },
	{ value: 'contact', label: 'Kontakt' },
	{ value: 'janitor', label: 'Vaktmester' },
	{ value: 'cleaner', label: 'Renholder' },
	{ value: 'extraHelp', label: 'Ekstrahjelp' },
	{ value: 'other', label: 'Andre' },
	{ value: 'supplier', label: 'Leverandør' },
	{ value: 'voluntaryWorkLeader', label: 'Dugnadsleder' },
	{ value: 'deputy', label: 'Varamedlem' },
	{ value: 'hseResponsible', label: 'HMS-ansvarlig' },
	{ value: 'fireChief', label: 'Brannvernleder' },
	{ value: 'ceo', label: 'Daglig leder' },
	{ value: 'constructionEngineer', label: 'Byggingeniør' },
	{ value: 'technicalAdvisor', label: 'Teknisk rådgiver' },
	{ value: 'technicalManager', label: 'Teknisk sjef' },
	{ value: 'operationEngineer', label: 'Driftstekniker' },
];
