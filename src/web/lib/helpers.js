import moment from 'moment';
export function getYearOptions() {
	let now = new Date().getFullYear();
	let years = [
		{
			value: now - 1,
			label: now - 1,
		},
	];

	for (let i = 0; i <= 10; i++) {
		years.push({
			value: now + i,
			label: now + i,
		});
	}
	return years;
}

export function getMonthOptions() {
	let months = [];

	for (let i = 1; i <= 12; i++) {
		months.push({
			value: i,
			label: moment(i, 'M').format('MMMM'),
		});
	}
	return months;
}

export function getAttributeLabel(value) {
	return assessmentAttributeLabels[value] || false;
}

const assessmentAttributeLabels = {
	name: 'Navn',
	description: 'Tilstandsbeskrivelse',
	address: 'Adresse',
	stateLevel: 'Tilstandsgrad',
	category: 'Kategori',
	objectType: 'Objekt',
	lifespan: 'Levetider',
	measure: 'Tiltak',
	cost: 'Kostnad',
	productionYear: 'Produksjonsår',
	dimensions: 'Dimensjoner',
	unitAmount: 'Mengde/enhet',
	createdAt: 'Opprettelsesdato',
	dueDate: 'Frist',
	isActive: 'Status',
	isComplete: 'Ferdigstilt',
	lastMaintained: 'Sist vedlikeholdt',
};

export function sanitizeString(str) {
	str = str.replace(/[^a-z0-9æøåáéíóúñü \.,_-]/gim, '');
	return str.trim();
}
