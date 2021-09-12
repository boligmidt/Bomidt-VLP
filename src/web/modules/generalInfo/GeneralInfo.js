import React, { useReducer } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import { useAppContext } from 'web/lib/AppProvider';
import {
	GET_GENERAL_INFO,
	ADD_GENERAL_INFO,
	UPDATE_GENERAL_INFO,
} from 'api/GeneralInfo';
import {
	conclusionContent,
	generalContent,
	costContent,
} from 'web/modules/generalInfo/defaultContent';
import { GET_FILES } from 'api/Files';
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import Loading from 'components/general/Loading';
import Form from 'components/forms/Form';
import GeneralInfoFields from 'web/modules/generalInfo/GeneralInfoFields';
import { Uploader } from 'components/general/Uploader';
import Image from 'components/general/Image';
import WysiwygSection from 'web/modules/singlepages/wysiwygSection';

const ImageSectionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 1rem;
`;

const Section = styled.div`
	margin-top: 60px;
`;

export default function GeneralInfo() {
	const { isAdmin, currentHousingCooperative } = useAppContext();
	const { data = {}, loading, error } = useQuery(GET_GENERAL_INFO, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			name: 'generell-informasjon',
		},
	});

	const [insertGeneralInformation] = useMutation(ADD_GENERAL_INFO, {
		refetchQueries: ['findGeneralInfo'],
	});

	const [updateGeneralInformation] = useMutation(UPDATE_GENERAL_INFO, {
		refetchQueries: ['findGeneralInfo'],
	});

	const { data: { files = null } = {}, refetch: refetchFiles } = useQuery(
		GET_FILES,
		{
			variables: {
				housingCooperativeId: currentHousingCooperative,
				page: 'generell-informasjon-images',
			},
		}
	);

	const [fileList, dispatchFile] = useReducer(
		(files = [], { task = '', data }) => {
			let newFileList = [];
			newFileList = [...files];
			switch (task) {
				case 'init':
					newFileList = data;
					return newFileList;
					break;

				case 'addFile':
					if (newFileList.length === 0) {
						newFileList = [data];
					} else {
						newFileList.push(data);
					}
					refetchFiles();
					return newFileList;
					break;

				case 'removefile':
					const itemIndex = newFileList.findIndex(
						element => element._id === data
					);
					newFileList.splice(itemIndex, 1);
					refetchFiles();
					return newFileList;
					break;
				default:
					return {};
			}
		}
	);

	async function handleSubmit(values) {
		if (data && data.generalInfo && data.generalInfo._id) {
			await updateGeneralInformation({
				variables: {
					...values,
				},
			});
		} else {
			await insertGeneralInformation({
				variables: {
					housingCooperativeId: currentHousingCooperative,
					name: 'generell-informasjon',
					...values,
				},
			});
		}
	}

	function handleContentEdit(content, key) {
		if (data && data.generalInfo && data.generalInfo._id) {
			updateGeneralInformation({
				variables: {
					_id: data.generalInfo._id,
					name: 'generell-informasjon',
					housingCooperativeId: currentHousingCooperative,
					[key]: content,
				},
			});
		} else {
			insertGeneralInformation({
				variables: {
					housingCooperativeId: currentHousingCooperative,
					name: 'generell-informasjon',
					[key]: content,
				},
			});
		}
	}

	if (loading) return <Loading />;
	if (error) return <p>Error</p>;

	if (files && !fileList) {
		dispatchFile({ task: 'init', data: files.items });
	}

	if (!data) {
		data = {
			generalInfo: {
				conclusionContent,
				generalContent,
				costContent,
			},
		};
	}

	if (data && !data.generalInfo) {
		data.generalInfo = {
			conclusionContent,
			generalContent,
			costContent,
		};
	}

	if (data && data.generalInfo && !data.generalInfo.conclusionContent) {
		data.generalInfo.conclusionContent = conclusionContent;
	}

	if (data && data.generalInfo && !data.generalInfo.generalContent) {
		data.generalInfo.generalContent = generalContent;
	}

	if (data && data.generalInfo && !data.generalInfo.costContent) {
		data.generalInfo.costContent = costContent;
	}

	const { generalInfo } = data;

	return (
		<Layout
			key={
				(data && data.generalInfo && data.generalInfo._id) ||
				'randomkey'
			}>
			<PageHeader>Generell Informasjon</PageHeader>

			<Form
				values={generalInfo}
				onSubmit={values => {
					handleSubmit(values);
				}}
				isLoading={loading}
				error={error}>
				<GeneralInfoFields isadmin={isAdmin} />
			</Form>

			{isAdmin && (
				<Uploader
					dispatch={file => {
						dispatchFile(file);
					}}
					housingCooperativeId={currentHousingCooperative}
					page="generell-informasjon-images"
					compression={true}
				/>
			)}

			<ImageSectionWrapper>
				{fileList &&
					fileList.map(file => (
						<Image
							key={file._id}
							id={file._id}
							dispatchFile={dispatchFile}
							fileUrl={file.fileUrl}
						/>
					))}
			</ImageSectionWrapper>

			<Section>
				<WysiwygSection
					header="Generelt"
					doc={generalInfo}
					contentKey="generalContent"
					housingCooperativeId={currentHousingCooperative}
					name="generalContent"
					userIsAdmin={isAdmin}
					saveAction={content =>
						handleContentEdit(content, 'generalContent')
					}
				/>
			</Section>

			<Section>
				<WysiwygSection
					header="Veiledende vedlikeholdsgrunnlag"
					doc={generalInfo}
					contentKey="costContent"
					housingCooperativeId={currentHousingCooperative}
					name="costContent"
					userIsAdmin={isAdmin}
					saveAction={content =>
						handleContentEdit(content, 'costContent')
					}
				/>
			</Section>
		</Layout>
	);
}
