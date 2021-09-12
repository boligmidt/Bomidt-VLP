import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import moment from 'moment';
import OnImagesLoaded from 'react-on-images-loaded';

import { GET_ASSESSMENTS } from 'api/Assessments';
import { GET_GENERAL_INFO } from 'api/GeneralInfo';
import { GET_FILES } from 'api/Files';
import { useAppContext } from 'web/lib/AppProvider';
import { stateLevels } from 'components/general/StateLevels';
import { conclusionContent } from 'web/modules/generalInfo/defaultContent';

const Wrapper = styled.div`
	margin: 0 10px;

	.fullheight {
		width: 100%;
		height: 270mm;
		page-break-after: always;
		font-family: sans-serif;
		border: 1px solid black;
	}
	h1 {
		margin: 10px 0 20px;
		text-align: center;
		font-weight: 900;
	}
	h2 {
		margin: 10px 0 20px;
		text-align: center;
		font-weight: 900;
	}
	h3 {
		margin: 10px 0 40px;
		text-align: center;
		font-weight: 900;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		margin-bottom: 40px;
	}
	table td {
		padding: 8px 10px;
		font-size: 12px;
		border: 1px solid black;
	}
	table td .content {
		font-size: 14px;
	}
	.label-cell,
	table tr td:first-of-type {
		width: 15%;
		font-weight: bold;
		border-left: none;
	}
	table tr td:last-of-type {
		border-right: none;
	}
	table tr:last-of-type td {
		border-bottom: none;
	}
	thead tr td {
		font-weight: 900;
	}
	img {
		display: block;
		max-width: 80%;
		max-height: 450px;
		margin: 0 auto;
	}
	.info-table tr td:nth-of-type(3),
	.info-table tr td:first-of-type {
		width: 15%;
	}
	.info-table tr td:nth-of-type(2),
	.info-table tr td:last-of-type {
		width: 35%;
	}
	.state-level-indicator {
		width: 30px;
		height: 20px;
		display: inline-block;
		vertical-align: bottom;
		margin-right: 10px;
		-webkit-print-color-adjust: exact;
	}
	.state-level-indicator.tgiu {
		background: #4e67ab;
	}
	.state-level-indicator.tg0 {
		background: #8bc34a;
	}
	.state-level-indicator.tg1 {
		background: #8bc34a;
	}
	.state-level-indicator.tg2 {
		background: #e8a72e;
	}
	.state-level-indicator.tg3 {
		background: #db2424;
	}
`;

export default function AllAssessments({ history }) {
	const { currentHousingCooperative, search, address } = useAppContext();

	const filterArray = ['tgiu', 'tg0', 'tg1', 'tg2', 'tg3'];

	const { loading, error, data } = useQuery(GET_ASSESSMENTS, {
		variables: {
			stateLevel: filterArray,
			housingCooperativeId: currentHousingCooperative || '',
			orderBy: 'groupOrder',
			search,
			address,
		},
	});

	const {
		loading: loadingPrintData,
		data: { generalInfo = null, housingCooperative = null } = {},
	} = useQuery(GET_GENERAL_INFO, {
		variables: {
			housingCooperativeId: currentHousingCooperative,
			name: 'generell-informasjon',
		},
	});
	const { data: { files = null } = {}, loading: loadingFiles } = useQuery(
		GET_FILES,
		{
			variables: {
				housingCooperativeId: currentHousingCooperative,
				page: 'generell-informasjon-images',
			},
		}
	);

	if (loading || loadingPrintData || loadingFiles || error || !data)
		return <p>Laster...</p>;

	let imageSrc = '';
	if (files && files.items && files.items.length) {
		const images = files.items.filter(
			image => image.fileType && image.fileType.includes('image')
		);

		imageSrc = images[0].fileUrl;
	}

	const { assessmentGroups } = data;

	return (
		<OnImagesLoaded
			onLoaded={() => {
				window.onafterprint = () => history.goBack();
				window.print();
			}}>
			<Wrapper>
				{generalInfo ? (
					<div className="fullheight">
						<div>
							<h1>Tilstandsvurderinger</h1>

							<h2>
								{generalInfo.housingcooperative ||
									housingCooperative.title}
							</h2>
						</div>

						<table>
							<tbody>
								{imageSrc && (
									<tr>
										<td colSpan="4">
											<img src={imageSrc} />
										</td>
									</tr>
								)}
								<tr>
									<td>
										<strong>Adresse</strong>
									</td>
									<td>{generalInfo.address}</td>

									<td>
										<strong>Byggematerialer</strong>
									</td>
									<td>{generalInfo.buildMaterials}</td>
								</tr>
								<tr>
									<td>
										<strong>Postnr og sted</strong>
									</td>
									<td>{generalInfo.zipCode}</td>

									<td>
										<strong>Tomteareal m2</strong>
									</td>
									<td>{generalInfo.plotSize}</td>
								</tr>
								<tr>
									<td>
										<strong>Gårdsnr</strong>
									</td>
									<td>{generalInfo.plotNumberOne}</td>

									<td>
										<strong>Bruttoareal m2</strong>
									</td>
									<td>{generalInfo.plotSizeBTA}</td>
								</tr>

								<tr>
									<td>
										<strong>Bruksnr</strong>
									</td>
									<td>{generalInfo.plotNumberTwo}</td>

									<td>
										<strong>Antall bygninger</strong>
									</td>
									<td>{generalInfo.units}</td>
								</tr>

								<tr>
									<td>
										<strong>Byggeår</strong>
									</td>
									<td>{generalInfo.buildYear}</td>

									<td>
										<strong>Antall leilighter</strong>
									</td>
									<td>{generalInfo.apartmentUnits}</td>
								</tr>

								<tr>
									<td>
										<strong>Befaringsdato</strong>
									</td>
									<td>{generalInfo.inspectionDate}</td>

									<td>
										<strong>Polisenr</strong>
									</td>
									<td>{generalInfo.policyId}</td>
								</tr>
								<tr>
									<td valign="top">
										<strong>Hovedkonklusjon</strong>
									</td>
									<td
										colSpan="3"
										style={{ whiteSpace: 'pre-line' }}>
										{generalInfo.conclusionContent ||
											conclusionContent}
									</td>
								</tr>
								<tr>
									<td colSpan="4"> </td>
								</tr>
							</tbody>
						</table>
					</div>
				) : null}

				{assessmentGroups && assessmentGroups.length
					? assessmentGroups.map(
							(group, i) =>
								group.subGroups &&
								group.subGroups.map(
									(subGroup, s) =>
										subGroup.items &&
										subGroup.items.map(item => {
											let currentStateLevel = stateLevels.find(
												level =>
													level.value ===
													item.stateLevel
											);

											let imageSrc = '';

											if (
												item.files &&
												item.files.length
											) {
												item.files.filter(
													image =>
														image.fileType &&
														image.fileType.includes(
															'image'
														)
												);
												imageSrc =
													item.files[0].fileUrl;

												if (item.primaryImageId) {
													item.files.forEach(
														image => {
															if (
																image._id ===
																item.primaryImageId
															) {
																imageSrc =
																	image.fileUrl;
															}
														}
													);
												}
											}

											return (
												<div
													key={item._id}
													className="fullheight">
													{subGroup.isSeparated && (
														<h2>
															{subGroup.title}
														</h2>
													)}

													<h3>{`${item.addressName} - ${item.name}`}</h3>

													<table>
														<tbody>
															<tr>
																<td>
																	Tilstandsbeskrivelse
																</td>
																<td colSpan="3">
																	{
																		item.description
																	}
																</td>
															</tr>
															<tr>
																<td>Tiltak</td>
																<td colSpan="3">
																	{
																		item.measure
																	}
																</td>
															</tr>
															<tr>
																<td>
																	Levetider
																</td>
																<td colSpan="3">
																	{item.lifespan &&
																		item.lifespan.join(
																			', '
																		)}
																</td>
															</tr>
															<tr>
																<td>Adresse</td>
																<td colSpan="3">
																	{
																		item.addressName
																	}
																</td>
															</tr>
															<tr>
																<td>
																	<strong>
																		Tilstandsgrad
																	</strong>
																</td>
																<td>
																	<span
																		className={`state-level-indicator ${currentStateLevel.value}`}
																	/>
																	{
																		currentStateLevel.label
																	}
																</td>
																<td className="label-cell">
																	<strong>
																		Kostnad
																		inkl.
																		mva
																	</strong>
																</td>
																<td>
																	{(isNaN(
																		item.cost
																	) &&
																		' ') ||
																		item.cost}
																</td>
															</tr>
															<tr>
																<td>
																	<strong>
																		Mengde,
																		Enhet
																	</strong>
																</td>
																<td>
																	{
																		item.unitAmount
																	}
																</td>
																<td className="label-cell">
																	<strong>
																		Dimensjoner
																	</strong>
																</td>
																<td>
																	{
																		item.dimensions
																	}
																</td>
															</tr>
															<tr>
																<td>
																	Opprettet
																</td>
																<td>
																	{moment(
																		item.createdAt
																	).format(
																		'YYYY/MM/DD'
																	)}
																</td>
																<td className="label-cell">
																	<strong>
																		Frist
																	</strong>
																</td>
																<td>
																	{item.dueDate &&
																		moment(
																			item.dueDate
																		).format(
																			'YYYY/MM'
																		)}
																</td>
															</tr>
															<tr>
																<td>
																	<strong>
																		Produksjonsår
																	</strong>
																</td>
																<td>
																	{
																		item.productionYear
																	}
																</td>
																<td>
																	<strong>
																		Sist
																		vedlikeholdt
																	</strong>
																</td>
																<td>
																	{
																		item.lastMaintained
																	}
																</td>
															</tr>
															<tr>
																<td>
																	<strong>
																		Ferdigstilt
																	</strong>
																</td>
																<td colSpan="3">
																	{item.isCompleted
																		? moment(
																				item.completedAt
																		  ).format(
																				'YYYY/MM/DD'
																		  )
																		: 'Ikke ferdigstilt'}
																</td>
															</tr>
															<tr>
																<td colSpan="4">
																	{imageSrc ? (
																		<img
																			src={
																				imageSrc
																			}
																		/>
																	) : (
																		' '
																	)}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											);
										})
								)
					  )
					: null}
			</Wrapper>
		</OnImagesLoaded>
	);
}
