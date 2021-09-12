import React, { useReducer, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EDIT_HELPVIDEO, GET_HELPVIDEO } from 'api/HelpVideos';
import Loading from 'components/general/Loading';
import PageHeader from 'components/general/PageHeader';
import Layout from 'components/layout/Layout';
import {ActionButton, FormWrapper, InputField, SelectBox, NumberSelector, Label} from './NewVideoForm'

export default function EditHelpVideoForm({ history, helpVideoId }) {
	console.log(helpVideoId);

	const { data: { helpVideo = null } = {}, error, loading } = useQuery(
		GET_HELPVIDEO,
		{
			variables: {
				_id: helpVideoId,
			},
		}
	);

	const [
		editHelpVideo,
		{ error: editError, loading: editLoading },
	] = useMutation(EDIT_HELPVIDEO);

	const [formData, setFormData] = useReducer((state, change) => {
		return { ...state, ...change };
	});

	useEffect(() => {
		console.log(formData ? true : false);

		if (!formData && helpVideo) {
			console.log(helpVideo);

			setFormData(helpVideo);
		}
	});

	const submitHandler = async () => {
		await editHelpVideo({ variables: formData });
		history.push('/hjelp');
	};

	if (error || editError) {
		return <p>Something went wrong</p>;
	}

	if (loading || editLoading || !formData) {
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
				maxWidth='3rem'
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
