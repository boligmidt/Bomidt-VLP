import React, { useReducer } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_HELPVIDEO } from 'api/HelpVideos';

import PageHeader from 'components/general/PageHeader';
import Layout from 'components/layout/Layout';
import styled from 'styled-components';
import { darken } from 'polished';
import { Button } from 'components/general/Buttons';
import Loading from 'components/general/Loading';

export const ActionButton = styled(Button)`
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
	&:last-child {
		margin-left: 0.5rem;
	}
`;
export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	width: 70%;
	margin-left: 15%;
`;
export const InputField = styled.input`
			height: 2rem;
			margin-right: 3rem;
			max-width: ${p => p.maxWidth? p.maxWidth : undefined };
		`;
export const SelectBox = styled.input`
	margin-right: 3rem;
	margin-left: 1rem;
	height: 2rem;
	width: 2rem;
`;
export const NumberSelector = styled.input``;
export const Label = styled.label`
	line-height: 3rem;
	text-align: justify;
	font-size: 2rem;
	margin-right: 1rem;
`;

export default function NewHelpVideoForm({ history }) {
	const [createHelpVideo, { error, loading }] = useMutation(CREATE_HELPVIDEO);

	const [formData, setFormData] = useReducer(
		(state, change) => {
			return { ...state, ...change };
		},
		{
			isMainVideo: false,
			forEditor: false,
			title: '',
			order: 0,
			embedCode: '',
		}
	);

	const submitHandler = async () => {
		await createHelpVideo({ variables: formData });
		history.push('/hjelp');
	};

	if (error) {
		return <p>Something went wrong</p>;
	}
	if (loading) {
		return <Loading />;
	}

	return (
		<Layout>
			<FormWrapper>
				<PageHeader>Legg til video</PageHeader>
				<Label>Tittel</Label>
				<InputField
					type="text"
					name="title"
					value={formData.title}
					onChange={e =>
						setFormData({ [e.target.name]: e.target.value })
					}
				/>
				<Label>Embed kode</Label>
				<InputField
					type="text"
					name="embedCode"
					value={formData.embedCode}
					onChange={e =>
						setFormData({ [e.target.name]: e.target.value })
					}
				/>
				<span>
					<Label>Rekkefølge</Label>
					<NumberSelector
						maxWidth="3rem"
						type="number"
						name="order"
						value={formData.order}
						onChange={e =>
							setFormData({
								[e.target.name]: parseInt(e.target.value),
							})
						}
					/>
					<Label>Er hovedvideo</Label>
					<SelectBox
						type="checkbox"
						name="isMainVideo"
						checked={formData.isMainVideo}
						onChange={e =>
							setFormData({ [e.target.name]: e.target.checked })
						}
					/>
					<Label>For editor</Label>
					<SelectBox
						type="checkbox"
						name="forEditor"
						checked={formData.forEditor}
						onChange={e =>
							setFormData({ [e.target.name]: e.target.checked })
						}
					/>
				</span>
				<span>
					<ActionButton type="button" onClick={() => submitHandler()}>
						Lagre
					</ActionButton>
					<ActionButton
						type="button"
						onClick={() => history.push('/hjelp')}>
						Avbryt
					</ActionButton>
				</span>
			</FormWrapper>
		</Layout>
	);
}
