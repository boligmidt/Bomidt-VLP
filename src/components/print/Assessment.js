import React from 'react';
import moment from 'moment';
import { stateLevels } from 'components/general/StateLevels';

export default function PrintAssessment({
	name,
	description,
	measure,
	lifespan,
	addressName,
	stateLevel,
	cost,
	dimensions,
	unitAmount,
	createdAt,
	completedAt,
	modifiedAt,
	isCompleted,
	dueDate,
	productionYear,
	lastMaintained,
	primaryImageId,
	files,
}) {
	let currentStateLevel = {};
	stateLevels.forEach(item => {
		if (item.value === stateLevel) {
			currentStateLevel = item;
		}
	});

	let imageSrc = '';
	if (files && files.length > 0) {
		files.filter(
			image => image.fileType && image.fileType.includes('image')
		);
		let timestamp = new Date().getTime();
		imageSrc = files[0].fileUrl

		if (primaryImageId) {
			files.forEach(image => {
				if (image._id === primaryImageId) {
					imageSrc = image.fileUrl
				}
			});
		}
		var img = new Image();
		img.src = imageSrc;
		console.log(img);
	}
	return (
		<div className="fullheight">
			<style
				dangerouslySetInnerHTML={{
					__html: `
			.fullheight {
				width: 100%;
				height: 90%;
				page-break-after: always;
				font-family: sans-serif;
			}
			h1 {
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
			}
			.label-cell,
			table tr td:first-of-type {
				width: 15%;
				font-weight: bold;
			}
			table,
			th,
			td {
				border: 1px solid black;
			}
			thead tr td {
				font-weight: 900;
			}
			img {
				display: block;
				max-width: 80%;
				max-height: 500px;
				margin: 0 auto;
			}
			`,
				}}
			/>
			<h3>{`${addressName} - ${name}`}</h3>

			<table>
				<tbody>
					<tr>
						<td>Tilstandsbeskrivelse</td>
						<td colSpan="3">{description}</td>
					</tr>
					<tr>
						<td>Tiltak</td>
						<td colSpan="3">{measure}</td>
					</tr>
					<tr>
						<td>Levetider</td>
						<td colSpan="3">{lifespan && lifespan.join(', ')}</td>
					</tr>
					<tr>
						<td>Adresse</td>
						<td colSpan="3">{addressName}</td>
					</tr>
					<tr>
						<td>
							<strong>Tilstandsgrad</strong>
						</td>
						<td>{currentStateLevel.label}</td>
						<td className="label-cell">
							<strong>Kostnad inkl. mva</strong>
						</td>
						<td>{(isNaN(cost) && ' ') || cost}</td>
					</tr>
					<tr>
						<td>
							<strong>Mengde, Enhet</strong>
						</td>
						<td>{unitAmount}</td>
						<td className="label-cell">
							<strong>Dimensjoner</strong>
						</td>
						<td>{dimensions}</td>
					</tr>
					<tr>
						<td>Opprettet</td>
						<td>{moment(createdAt).format('YYYY/MM/DD')}</td>
						<td className="label-cell">
							<strong>Frist</strong>
						</td>
						<td>{dueDate && moment(dueDate).format('YYYY/MM')}</td>
					</tr>
					<tr>
						<td>
							<strong>Produksjonsår</strong>
						</td>
						<td>{productionYear}</td>
						<td>
							<strong>Sist vedlikeholdt</strong>
						</td>
						<td>{lastMaintained}</td>
					</tr>
					<tr>
						<td>
							<strong>Ferdigstilt</strong>
						</td>
						<td colSpan="3">
							{isCompleted
								? moment(completedAt || modifiedAt).format(
										'YYYY/MM/DD'
								  )
								: 'Ikke ferdigstilt'}
						</td>
					</tr>
					{imageSrc ? (
						<tr>
							<td colSpan="4">
								<img src={imageSrc} />
							</td>
						</tr>
					) : null}
				</tbody>
			</table>
		</div>
	);
}
