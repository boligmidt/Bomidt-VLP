import React, { useRef } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAppContext } from 'web/lib/AppProvider';
import ActivitiesList from 'components/general/ActivitiesList';
import { IconButton } from 'components/general/Buttons';
import { UploadButton } from 'components/general/Uploader';
import { FormRow, Field } from 'components/general/SingleAssessmentOpen';
import { GET_ACTIVITIES, CREATE_ACTIVITY } from 'api/Activities';
import theme from 'web/styles/theme';
import { sanitizeString } from 'web/lib/helpers';

const ExtendedWrap = styled.div`
	display: flex;
	padding: 30px 0 15px;
`;
const ExtendedLeft = styled.div`
	flex: 2;
	padding: 0 15 30px;
`;
const ExtendedRight = styled.div`
	flex: 1;
	padding: 0 15px;
`;

export default function ExtendedAssessment({ ...props }) {
	const { user, isAdmin } = useAppContext();
	const formRef = useRef(null);

	const { data, loading, error } = useQuery(GET_ACTIVITIES, {
		variables: {
			assessmentId: props._id,
		},
	});

	const [createComment] = useMutation(CREATE_ACTIVITY, {
		refetchQueries: [
			{
				query: GET_ACTIVITIES,
				variables: {
					assessmentId: props._id,
				},
			},
		],
	});

	function submitComment(event) {
		event.preventDefault();
		event.stopPropagation();
		let value = '';
		if (event.target.comment.value.length > 2) {
			value = sanitizeString(event.target.comment.value);
		}

		if (value) {
			createComment({
				variables: {
					assessmentId: props._id,
					type: 'comment',
					comment: value,
					userName: user.name,
				},
			});
		}

		event.target.comment.value = '';
	}

	if (loading) return null;

	return (
		<ExtendedWrap>
			<ExtendedLeft>
				<form onSubmit={event => submitComment(event)} ref={formRef}>
					<FormRow>
						<Field label="Legg til kommentar" flex="1">
							<textarea
								name="comment"
								style={{
									display: 'block',
									width: '100%',
									marginBottom: '15px',
								}}
								rows="6"></textarea>

							<IconButton
								label="Lagre"
								backgroundColor={theme.colors.pink}
								hoverBackgroundColor={theme.colors.pink}
								borderColor={theme.colors.pink}
								hoverBorderColor={theme.colors.pink}
								color="white"
								hoverColor="white"
								type="submit"
							/>
						</Field>
					</FormRow>
				</form>
				{data && data.activities && (
					<ActivitiesList activities={data && data.activities} />
				)}
			</ExtendedLeft>

			<ExtendedRight>
				<UploadButton
					docId={props._id}
					onUploadFinished={props.refetchAssessment}
					compression={true}
				/>

				<div style={{ paddingBottom: '15px' }}></div>

				{isAdmin && (
					<IconButton
						label="Deaktiver tiltak"
						iconProps={{
							icon: 'window-close',
							solid: true,
							size: 'sm',
						}}
						backgroundColor={theme.colors.gray}
						hoverBackgroundColor={theme.colors.blue}
						borderColor={theme.colors.gray}
						hoverBorderColor={theme.colors.blue}
						color={theme.colors.blue}
						hoverColor="white"
						fullWidth={true}
						onClick={props.deactivateAssessmentClick}
					/>
				)}

				<div style={{ paddingBottom: '15px' }}></div>

				<IconButton
					label="Merk som ferdig"
					iconProps={{
						icon: 'check-square',
						solid: true,
						size: 'sm',
					}}
					backgroundColor={theme.colors.gray}
					hoverBackgroundColor={theme.colors.blue}
					borderColor={theme.colors.gray}
					hoverBorderColor={theme.colors.blue}
					color={theme.colors.blue}
					hoverColor="white"
					fullWidth={true}
					onClick={props.completeAssessmentClick}
				/>
			</ExtendedRight>
		</ExtendedWrap>
	);
}
