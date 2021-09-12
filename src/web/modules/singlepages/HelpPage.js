import React, { useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useAppContext } from 'web/lib/AppProvider';
import styled from 'styled-components';

// components
import Layout from 'components/layout/Layout';
import PageHeader from 'components/general/PageHeader';
import { AddButton } from 'components/general/Buttons';
import Loading from 'components/general/Loading';
import WysiwygSection from 'web/modules/singlepages/wysiwygSection';
import { Section } from 'components/general/Section';
import loginBg from 'assets/images/login-bg.jpg';
import digiboLogo from 'assets/images/digibo_logo.png'

// queries
import { GET_SINGLEPAGE } from 'api/SinglePages';
import { GET_HELPVIDEOS } from 'api/HelpVideos';

const VideosWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0 -10px;
`;
const VideoWrap = styled.div`
	flex: 0 0 100%;
	padding: 0 10px 20px;

	@media (min-width: 768px) {
		flex: 0 0 33%;
	}
`;
const VideoInnerWrap = styled.div`
	box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.16);
`;
const VideoThumb = styled.div`
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
	background-image: url(${loginBg});
	padding-bottom: 60%;
`;
const VideoLabel = styled.div`
	background: white;
	padding: 10px;
`;

export default function HelpPage({ history }) {
	const { isAdmin, isEditor, currentHousingCooperative } = useAppContext();
	const [currentVideo, setCurrentVideo] = useState(null);

	const {
		data: { singlePageData = null } = {},
		loading: singlePageLoading,
		error: singlePageError,
	} = useQuery(GET_SINGLEPAGE, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			name: 'kontaktinfo',
		},
	});

	const {
		data: { helpVideos = null } = {},
		loading: videosLoading,
		error: videosError,
	} = useQuery(GET_HELPVIDEOS);

	if (singlePageLoading) return <Loading />;
	if (singlePageError) return <p>Error</p>;

	let mainVideo = null;
	if (helpVideos && helpVideos.items) {
		mainVideo = helpVideos.items.filter(video => video.isMainVideo);
	}

	return (
		<Layout>
			<PageHeader>Hjelp / Kontaktinfo</PageHeader>
			<Section>
				<img src={digiboLogo} width="80" height="25" />
				<h4>
					<a
						target="_blank"
						href="https://teams.microsoft.com/l/team/19%3aacd2f642c531444dbcee91630c1745ca%40thread.tacv2/conversations?groupId=f83cf36d-a4a2-4aae-b603-21f277d1ea34&tenantId=26d29274-5a45-438c-bea6-f6f11d8e730b">
						Brukerforum VLP-superbruker
					</a>
				</h4>
			</Section>
			{currentHousingCooperative && (
				<Section>
					<WysiwygSection
						header="Kontaktinformasjon"
						doc={singlePageData}
						contentKey="content"
						housingCooperativeId={currentHousingCooperative}
						name="kontaktinfo"
						userIsAdmin={isEditor}
					/>
				</Section>
			)}

			{/* <Section>
				{mainVideo && (
					<VideoHolder
						video={currentVideo ? currentVideo : mainVideo[0]}
					/>
				)}

				<VideosWrapper>
					{helpVideos && helpVideos.items
						? helpVideos.items.map(video => (
								<VideoWrap key={video._id}>
									<VideoInnerWrap>
										<VideoThumb
											onClick={() =>
												setCurrentVideo(video)
											}
										/>
										<VideoLabel>{video.title}</VideoLabel>
									</VideoInnerWrap>
								</VideoWrap>
						  ))
						: null}
				</VideosWrapper>
			</Section> */}

			{currentHousingCooperative && (
				<Section>
					<WysiwygSection
						header="Informasjon"
						doc={singlePageData}
						contentKey="contentTwo"
						housingCooperativeId={currentHousingCooperative}
						name="kontaktinfo"
						userIsAdmin={isEditor}
					/>
				</Section>
			)}

			{/* {isAdmin && (
				<AddButton onClick={() => history.push(`/hjelp/ny-video/`)} />
			)} */}
		</Layout>
	);
}

function VideoHolder({ video }) {
	const videoRef = useRef(null);

	function resizeVideo() {
		let fullWidth = videoRef.current.offsetWidth;
		let iframe = videoRef.current.querySelector('iframe');
		iframe.height = (fullWidth * 9) / 16;
		iframe.width = '100%';
	}
	useEffect(() => {
		resizeVideo();
	}, [video]);

	return (
		<div>
			<h3>{video.title}</h3>
			<div
				ref={videoRef}
				style={{ paddingBottom: '30px' }}
				dangerouslySetInnerHTML={{
					__html: video.embedCode,
				}}
			/>
		</div>
	);
}
